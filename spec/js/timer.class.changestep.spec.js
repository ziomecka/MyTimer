/* jshint esversion: 6 */
import Defaults from "../../app/mytimer.defaults";
import Timer from "../../app/mytimer.class";
import scenariosChangeStep from "../scenarios/timer.scenarios.changestep";
import messages from "../../app/mytimer.messages";

let defs = new Defaults();

describe("When timer is stopped and step is changed: ", () => {

  scenariosChangeStep.sessionStep.forEach((scenario) => {
    let timer = new Timer();

    /** expected value may be:
				either incremental (if sceanrio.increment === 1),
				or brand new (if scenario.increment === 0).
				*/
		let scenarioI = scenario.increment;
    let scenarioS = scenario.sign;
    let step = scenario.step;
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

    it(`the ${step} is changed ${word} ${change}, then the timer returns correct ${step}`, () => {
      timer.changeStep(scenario);
      expect(timer[step]).toBe(expectedValue > 0? expectedValue : 0);
    });
  });
});

describe("When timer's changeStep method get's invalid arguments: ", () => {
  scenariosChangeStep.invalidStep.forEach((scenario) => {
    let timer = new Timer();
    it(`invalid step's name: the timer throws error.`, () => {
      expect(() => timer.changeStep(scenario)).toThrowError(messages.stepNotChanged);
    });
  });
});

describe("When timer is stopped and the step is decreased several times and the accumulated change is higher than the step's length: ", () => {
    let scenario = {
      step: "session",
      value: 1,
      units: "minutes",
      increment: 1,
      sign: -1
    };
    let timerOptions = {
      steps: {
        session: {
          value: 5,
          units: "minutes"
        },
        interval: {
          value: 1,
          units: "milliseconds"
        }
      },
      countUnits: ["hours", "minutes", "seconds", "milliseconds"]
    };
    let timer = new Timer(timerOptions);
    let change = timer._this.convert(scenario);
    let step = scenario.step;
    let times = Math.ceil(timer._this.convert(timerOptions.steps[step]) / change) + 1;
    console.log(times);
    for (let i = 0; i < times; i++) {
      timer.changeStep(scenario);
    }
    it(`the step's final length is zero.`, () => {
      expect(timer[step]).toBe(0);
    });
    console.log(timer[step]);
});
