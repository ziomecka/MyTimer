/* jshint esversion: 6 */
import Defaults from "../../app/mytimer.defaults";
import Timer from "../../app/mytimer.class";
import scenariosCounting from "../scenarios/timer.scenarios.counting";

let defs = new Defaults();


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

    });

    afterEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
});
