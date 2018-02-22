/* jshint esversion: 6 */

// TODO test creating and removing methods
// TODO test real counting
// TODO return correct values when stepChanged
// TODO what if direction changes when ccounting?

import Defaults from "../../app/mytimer.defaults";
import Timer from "../../app/mytimer.class";
import scenariosInitialise from "../scenarios/timer.scenarios.initialise";
import scenariosCounting from "../scenarios/timer.scenarios.counting";
import scenariosChangeStep from "../scenarios/timer.scenarios.changestep";

let defs = new Defaults();

describe("Initialised timer: ", () => {

  it(`called with invalid countUnits throws type error`, () => {
    let arg = "invalid count units";
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

		/** test for invalid units */
		let invalidUnitsScenarios = scenariosInitialise["invalid units"];
		let invalidUnits = Object.keys(invalidUnitsScenarios);
		invalidUnits.forEach((invalidUnit) => {
			it(`with invalid units for ${invalidUnit} has units in milliseconds.
				Remaining steps have values as provided in arguments.`, () => {
				let timer = new Timer(invalidUnitsScenarios[invalidUnit])._this;
				expect(console.warn).toHaveBeenCalledWith(`Timer has been initialised with different values than those specified in constructor's call.
                              It is due to the received error:
                              '${invalidUnit} step: Unit is incorrect.'`);
				expect(checkValues(timer, invalidUnitsScenarios[invalidUnit])).toBe(true);
			});
		});

		/** test for invalid values */
		let invalidValuesScenarios = scenariosInitialise["invalid values"];
		let invalidValues = Object.keys(invalidValuesScenarios);
		invalidValues.forEach((invalidValue) => {
			it(`with invalid units for ${invalidValue} has units in milliseconds.
				Remaining steps have values as provided in arguments.`, () => {
				let timer = new Timer(invalidValuesScenarios[invalidValue])._this;
				expect(console.warn).toHaveBeenCalledWith(`Timer has been initialised with different values than those specified in constructor's call.
                              It is due to the received error:
                              '${invalidValue} step: Value is not a number.'`);
				expect(checkValues(timer, invalidValuesScenarios[invalidValue])).toBe(true);
			});
		});

		/** test for lack of units */
		let lackOfUnitsScenarios = scenariosInitialise["lack of units"];
		let lackOfUnits = Object.keys(lackOfUnitsScenarios);
		lackOfUnits.forEach((lackOfUnit) => {
			it(`with lack of ${lackOfUnit}'s units assumes 'milliseconds'.
				Remaining steps have values as provided in arguments.`, () => {
				let timer = new Timer(lackOfUnitsScenarios[lackOfUnit])._this;
				expect(console.warn).toHaveBeenCalledWith(`Since no units were given,
                    it was assumed that the value was given in milliseconds`);
				expect(checkValues(timer, lackOfUnitsScenarios[lackOfUnit])).toBe(true);
			});
		});

		/** test for lack of values */
		let lackOfValuesScenarios = scenariosInitialise["lack of value"];
		let lackOfValues = Object.keys(lackOfValuesScenarios);
		lackOfValues.forEach((lackOfValue) => {
			it(`with lack of ${lackOfValue}'s value has default value.
				Remaining steps have values as provided in arguments.`, () => {
				let timer = new Timer(lackOfValuesScenarios[lackOfValue])._this;
				expect(console.warn).toHaveBeenCalledWith(`Timer has been initialised with different values than those specified in constructor's call.
                              It is due to the received error:
                              '${lackOfValue} step: Value is not a number.'`);
				expect(checkValues(timer, lackOfValuesScenarios[lackOfValue])).toBe(true);
			});
		});
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

describe("Timer: ", () => {
  let timer;
  beforeEach(() => {
    timer = new Timer();
  });
    it("changes status when started, paused, started and stopped", () => {
      timer.start();
      expect(timer.status).toBe(timer._this.statuses.get("counting"));
      timer.pause();
      expect(timer.status).toBe(timer._this.statuses.get("paused"));
      timer.start();
      expect(timer.status).toBe(timer._this.statuses.get("counting"));
      timer.stop();
      expect(timer.status).toBe(timer._this.statuses.get("stopped"));
    });
    it("changes status when started, paused and stopped", () => {
      timer.start();
      expect(timer.status).toBe(timer._this.statuses.get("counting"));
      timer.pause();
      expect(timer.status).toBe(timer._this.statuses.get("paused"));
      timer.stop();
      expect(timer.status).toBe(timer._this.statuses.get("stopped"));
    });
    it("does not change status to pause when started, stopped and then paused", () => {
      timer.start();
      expect(timer.status).toBe(timer._this.statuses.get("counting"));
      timer.stop();
      expect(timer.status).toBe(timer._this.statuses.get("stopped"));
      timer.pause();
      expect(timer.status).toBe(timer._this.statuses.get("stopped"));
    });
    it("allows to chain methods: start, paus and stopp", () => {
      timer.start().pause().stop();
      expect(timer.status).toBe(timer._this.statuses.get("stopped"));
    });
  afterEach(() => {
    timer = null;
  });
});
describe("Timer subscribes listeners and: ", () => {
  let timer;
  let remove = {};
  let listener = {
    started: () => console.log("started"),
    stopped: () => console.log("stopped"),
    paused: () => console.log("paused"),
  };
  beforeEach(() => {
    timer = new Timer();
    spyOn(console, "log");
  });

    it("publishes events when started, paused and stopped. Listener logs to conscole when event published.", () => {
      remove.started = timer.event.subscribe(listener, "sessionStarted", "started");
      remove.paused = timer.event.subscribe(listener, "sessionPaused", "paused");
      remove.stopped = timer.event.subscribe(listener, "sessionStopped", "stopped");
      timer.start();
      expect(console.log).toHaveBeenCalledWith(`started`);
      timer.pause();
      expect(console.log).toHaveBeenCalledWith(`paused`);
      timer.stop();
      expect(console.log).toHaveBeenCalledWith(`stopped`);
    });

    it("removes listeners.", () => {
      remove.started.remove();
      expect(timer._this.listeners.sessionStarted.length).toBe(0);
      remove.paused.remove();
      expect(timer._this.listeners.sessionPaused.length).toBe(0);
      remove.stopped.remove();
      expect(timer._this.listeners.sessionStopped.length).toBe(0);
    });

  afterEach(() => {
    timer = null;
  });
});

describe("Timer: ", () => {

  scenariosChangeStep.sessionStep.forEach((scenario) => {
    let timer = new Timer();

    /** expected value may be:
				either incremental (if sceanrio.increment === 1),
				or brand new (if scenario.increment === 0).
				*/
		let scenarioI = scenario.increment;
    let scenarioS = scenario.sign;
		let increment = (scenarioI === 1 || scenarioI === 0)? scenarioI : 0;
    let sign = (scenarioS === 1 || scenarioS === -1)? scenarioS : 1;
    let expectedValue = timer._this.convert(scenario) * sign + timer.session * increment;
		/** change in scenario */
    let change = `${scenario.value} ${scenario.units}`;
		/** test description depends on increment value */
    let word = increment? "by" : "to";
    let name = (!increment)? "sets new value" :
							(increment === 1)? "increments" :
							(increment === -1)? "decrements" : "wrong scenario";

		it(`${name} session ${word} ${change}`, () => {
      timer.changeStep(scenario);
      expect(timer.session).toBe(expectedValue);
    });
  });

  scenariosChangeStep.invalidStep.forEach((scenario) => {
    timer = new Timer();
    it(`throws error if step is invalid`, () => {
      expect(() => timer.changeStep(scenario)).toThrowError("Object passed to session is invalid.");
    });
  });
});
