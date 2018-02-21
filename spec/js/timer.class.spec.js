/* jshint esversion: 6 */

// TODO: test creating and removing methids
// TODO test createC
// TODO test real counting

import Defaults from "../../app/assets/js/mytimer.defaults";
import Timer from "../../app/assets/js/mytimer.class";
import scenariosInitialise from "../scenarios/timer.scenarios.initialise";
import scenariosCounting from "../scenarios/timer.scenarios.counting";

let defs = new Defaults();

describe("Initialised timer: ", () => {

  it(`called with invalid display units throws type error`, () => {
    let arg = "invalidDisplayUnits";
    let callTimer = (arg) => new Timer(arg);
    expect(() => callTimer(scenariosInitialise[arg]))
      .toThrow(new TypeError("Timer has not been initialised because of incorrect argument countUnits."));
  });

  describe (`called with different step arguments
		(steps = [interval, session]), has correct step values: `, () => {

    beforeEach(() => {
      spyOn(console, "warn");
    });
    /** check if timer's step values (session and interval) are equal either to values provided in arguments or to values provide in defs */
    let checkValues = (timer, args) => {
	    /** calculate value in milliseconds */
	    let calculate = (data, units) => {
				/** calculate only for valid numbers */
				if (typeof data.value === "number" && !Number.isNaN(data.value)) {
					return data.value * units[data.units];
				}
	    };
	    /** get the compare value: either arguments or defs and compare timer's value to the compare value */
	    let argsSteps = args? args.steps : null;

	    let compare = (step, args) => {
	      let argumentsValue = 0;
	      /** if value and units definde in arguments get the value, otherwise null */
	      if (args && "value" in args[step] && "units" in args[step]) {
	        argumentsValue = calculate(args[step], timer.units);
	      } else {
	        argumentsValue = null;
	      }
	      /** make the compareValue either the arguments' value (if truthy) or the defs's value */
	      let compareValue = argumentsValue? argumentsValue : calculate(defs.steps[step], timer.units);
	      return (timer[step] === compareValue);
	    };
	    /** make the comparison for every step ("session, interval") */
	    return Object.keys(defs.steps).every((step) => compare(step, (argsSteps)));
    };

		let checkMethods = (timer, args) => {
			let countUnits = args.countUnits;
			if (countUnits) {
				return countUnits.every(unit => unit in timer);
			}
		}

    it(`without arguments has steps values equal to default values.`, () => {
      /** timer exist? */
      let timer = new Timer()._this;
      expect(timer).toExist();
      expect(checkValues(timer)).toBe(true);
    });

    /** test for valid arguments */
    let valid = scenariosInitialise.valid;
    let validValues = Object.keys(valid);
    validValues.forEach((validValue) => {
      it(`with valid arguments has values as provided in arguments.`, () => {
        let arg = "validArguments";
        let timer = new Timer(valid[validValue])._this;
        expect(checkValues(timer, valid[validValue])).toBe(true);
      });
    });

		/** test for invalid arguments */
		let invalid = scenariosInitialise.invalid;
		let invalidValues = Object.keys(invalid);
		invalidValues.forEach((invalidValue) => {
			it(`with invalid ${invalidValue} has default ${invalidValue}.
				Remaining steps have values as provided in arguments.`, () => {
				let timer = new Timer(invalid[invalidValue])._this;
				expect(console.warn).toHaveBeenCalledWith(`Timer has been initialised with different values than those specified in constructor's call.`);
				expect(checkValues(timer, invalid[invalidValue])).toBe(true);
			});
		});
		/** test for lack of arguments */
		let lack = scenariosInitialise.lack;
		let lackOfValues = Object.keys(lack);
		invalidValues.forEach((lackValue) => {
			it(`with lack of ${lackValue} has default ${lackValue}.
				Remaining steps have values as provided in arguments.`, () => {
				let timer = new Timer(lack[lackValue])._this;
				expect(console.warn).toHaveBeenCalledWith(`Timer has been initialised with different values than those specified in constructor's call.`);
				expect(checkValues(timer, lack[lackValue])).toBe(true);
			});
		});
		/** only some countUnits are called */
  });

});

describe("Started timer: ", () => {
  /** test for valid arguments */
  let valid = scenariosInitialise.valid;
  let validValues = Object.keys(valid);
  validValues.forEach((validValue) => {
    it ('returns correct hours, minutes, seconds and milliseconds', () => {
      let timer = new Timer(valid[validValue]);
      timer.start();

      timer._this.countUnits.forEach((countUnit) => {
        let methodName = `currentTime_${countUnit}`;

        /** does method exist? */
        expect(timer[methodName]).toExist();
        /** does method return correct time value? */
        let a = timer[methodName]();
        let timeDifference =
          Math.abs(timer[methodName]() - valid[validValue].tests.startValues[countUnit]);
        expect(timeDifference).toBeLessThanOrEqual(1);
        // toBeCloseTo(valid[validValue].tests.startValues[countUnit],);
      });
      timer.stop();
    });
  });
});

/** "If" because counting is simulated in the tes by adding counting time to the
    hidden timer's now property. It is done to short the testing time. */
describe("'If' timer was counting (for explanaition of 'if' see the tests' code): ", () => {
  let originalTimeout;

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
  });

  scenariosCounting.forEach((scenario) => {
    let time = scenario.countingTime;
    let valid = scenario.settings;
    let countUnits  = scenario.settings.countUnits.join(", ");
    let results = scenario.results;
    let direction = scenario.settings.direction;
    let timer;

    it (`${direction} for ${time} milliseconds then it would
       return correct ${countUnits}`, (done) => {
      let timer = new Timer(valid);
      let timerCallback = () => timer.pause();
      let runIt = () => {
        timer._this.countUnits.forEach((countUnit) => {
          let methodName = `currentTime_${countUnit}`;
          let timerValue = timer[methodName]();
          let expectedValue = results[countUnit];
          /* difference in milliseconds */
          // let shortestUnit = timer._this.shortestCountUnit();
          //
          // TODO moze sie roznic o bardzo duzo
          let acceptedDifference = scenario.acceptedDifference || 0;
          /** calculate time difference in milliseconds */
          let timeDifference = timer._this.convert({value: Math.abs(timerValue - expectedValue)});
          /** the difference should be not higher then ... */
          expect(timeDifference)
            .toBeLessThanOrEqual(acceptedDifference,
              `when counting for ${time} milliseconds,
               ${countUnit} differs by ${timeDifference} milliseconds`);
        });
      };

      // timer.start().stop();  // TODO w większej ilości miejsc zwracac timer
      /** Set timer "now" property to time value that the timer would reach if it had been counting */
      timer._this.now = timer._this.start + time;
      runIt();
      done();

      // TODO zrobic drugi taki test na mniejszych wartosciach
      // timer.start();
      //
      // setTimeout(() =>  {
      //   timerCallback();
      //   runIt();
      //   done();
      // }, time);

    });

    afterEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
});
