/* jshint esversion: 6 */

// TODO split between files
// TODO test creating and removing methods
// TODO test real counting
// TODO return correct values when stepChanged
// TODO test passing negative values - error expected
// TODO what if direction changes when ccounting?

import Defaults from "../../app/mytimer.defaults";
import Timer from "../../app/mytimer.class";
import scenariosChangeStep from "../scenarios/timer.scenarios.changestep";
import messages from "../../app/mytimer.messages";

let defs = new Defaults();

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
      expect(timer.session).toBe(expectedValue > 0? expectedValue : 0);
    });
  });

  scenariosChangeStep.invalidStep.forEach((scenario) => {
    let timer = new Timer();
    it(`throws error if step is invalid`, () => {
      expect(() => timer.changeStep(scenario)).toThrowError(messages.stepNotChanged);
    });
  });
});
