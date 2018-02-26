/* jshint esversion: 6 */

// TODO split between files
// TODO test creating and removing methods
// TODO test real counting
// TODO return correct values when stepChanged
// TODO test passing negative values - error expected
// TODO what if direction changes when ccounting?

import Defaults from "../../app/mytimer.defaults";
import Timer from "../../app/mytimer.class";
import scenariosInitialise from "../scenarios/timer.scenarios.initialise";
import messages from "../../app/mytimer.messages";

let defs = new Defaults();

describe("Initialised timer: ", () => {

  it(`called with invalid countUnits warns in console`, () => {
    let arg = scenariosInitialise.invalid["invalid count units"];
    spyOn(console, "warn");
    let timer = new Timer(arg);
    expect(console.warn).toHaveBeenCalledWith(messages.initialisedWithDefaults);
    // TODO add checking if default count units
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
		let invalidUnitsScenarios = scenariosInitialise.invalid["invalid units"];
		let invalidUnits = Object.keys(invalidUnitsScenarios);
		invalidUnits.forEach((invalidUnit) => {
			it(`with invalid units for ${invalidUnit} has units in milliseconds.
				Remaining steps have values as provided in arguments.`, () => {
				let timer = new Timer(invalidUnitsScenarios[invalidUnit])._this;
				expect(console.warn).toHaveBeenCalledWith(messages.initialisedWithDefaults);
				expect(checkValues(timer, invalidUnitsScenarios[invalidUnit])).toBe(true);
			});
		});

		/** test for invalid values */
		let invalidValuesScenarios = scenariosInitialise.invalid["invalid values"];
		let invalidValues = Object.keys(invalidValuesScenarios);
		invalidValues.forEach((invalidValue) => {
			it(`with invalid units for ${invalidValue} has units in milliseconds.
				Remaining steps have values as provided in arguments.`, () => {
				let timer = new Timer(invalidValuesScenarios[invalidValue])._this;
				expect(console.warn).toHaveBeenCalledWith(messages.initialisedWithDefaults);
				expect(checkValues(timer, invalidValuesScenarios[invalidValue])).toBe(true);
			});
		});

		/** test for lack of units */
		let lackOfUnitsScenarios = scenariosInitialise.invalid["lack of units"];
		let lackOfUnits = Object.keys(lackOfUnitsScenarios);
		lackOfUnits.forEach((lackOfUnit) => {
			it(`with lack of ${lackOfUnit}'s units assumes 'milliseconds'.
				Remaining steps have values as provided in arguments.`, () => {
				let timer = new Timer(lackOfUnitsScenarios[lackOfUnit])._this;
				expect(console.warn).toHaveBeenCalledWith(messages.millisecondsAssumed);
				expect(checkValues(timer, lackOfUnitsScenarios[lackOfUnit])).toBe(true);
			});
		});

		/** test for lack of values */
		let lackOfValuesScenarios = scenariosInitialise.invalid["lack of value"];
		let lackOfValues = Object.keys(lackOfValuesScenarios);
		lackOfValues.forEach((lackOfValue) => {
			it(`with lack of ${lackOfValue}'s value has default value.
				Remaining steps have values as provided in arguments.`, () => {
				let timer = new Timer(lackOfValuesScenarios[lackOfValue])._this;
				expect(console.warn).toHaveBeenCalledWith(messages.initialisedWithDefaults);
				expect(checkValues(timer, lackOfValuesScenarios[lackOfValue])).toBe(true);
			});
		});
  });
});
