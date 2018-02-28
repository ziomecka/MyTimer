/* jshint esversion: 6 */
import Defaults from "../../app/mytimer.defaults";
import Timer from "../../app/mytimer.class";
import scenariosCounting from "../scenarios/timer.scenarios.realcounting";

let defs = new Defaults();

describe("When timer is counting ", () => {
  let originalTimeout;
  /* in milliseconds */
  let defaultAcceptedDifference = 10;

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

    it (`${direction} for ${time} milliseconds and stops then it returns correct ${countUnits}`, (done) => {
      let timer = new Timer(valid);
      let timerCallback = () => timer.stop();
      let runIt = () => {
        timer._this.countUnits.forEach((countUnit) => {
          let methodName = `currentTime_${countUnit}`;
          let timerValue = timer[methodName]();
          let expectedValue = results[countUnit];
          let acceptedDifference = scenario.acceptedDifference || defaultAcceptedDifference;
          /** calculate time difference in milliseconds */
          let timeDifference = timer._this.convert({value: Math.abs(timerValue - expectedValue)});
          /** the difference should be not higher then ... */
          expect(timeDifference)
            .toBeLessThanOrEqual(acceptedDifference,
              `when counting for ${time} milliseconds,
               ${countUnit} differs by ${timeDifference} milliseconds`);
        });
      };

      timer.start();
      setTimeout(() =>  {
        timerCallback();
        runIt();
        done();
      }, time);
    });
    it (`${direction} for ${time} milliseconds and pauses then it returns correct ${countUnits}`, (done) => {
      let timer = new Timer(valid);
      let timerCallback = () => timer.pause();
      let runIt = () => {
        timer._this.countUnits.forEach((countUnit) => {
          let methodName = `currentTime_${countUnit}`;
          let timerValue = timer[methodName]();
          let expectedValue = results[countUnit];
          let acceptedDifference = scenario.acceptedDifference || defaultAcceptedDifference;
          /** calculate time difference in milliseconds */
          let timeDifference = timer._this.convert({value: Math.abs(timerValue - expectedValue)});
          /** the difference should be not higher then ... */
          expect(timeDifference)
            .toBeLessThanOrEqual(acceptedDifference,
              `when counting for ${time} milliseconds,
               ${countUnit} differs by ${timeDifference} milliseconds`);
        });
      };

      timer.start();
      setTimeout(() =>  {
        timerCallback();
        runIt();
        done();
      }, time);
    });

    it (`${direction} for ${time} milliseconds, pauses, restarts and stops then it returns correct ${countUnits}`, (done) => {
      let timer = new Timer(valid);
      let timerCallback = () => {
        timer.pause();
        /* wait with restarting */
        setTimeout(() => {
          timer.start();
          timer.stop();
        }, time);
      };

      let runIt = () => {
        timer._this.countUnits.forEach((countUnit) => {
          let methodName = `currentTime_${countUnit}`;
          let timerValue = timer[methodName]();
          let expectedValue = results[countUnit];
          let acceptedDifference = scenario.acceptedDifference || defaultAcceptedDifference;
          /** calculate time difference in milliseconds */
          let timeDifference = timer._this.convert({value: Math.abs(timerValue - expectedValue)});
          /** the difference should be not higher then ... */
          expect(timeDifference)
            .toBeLessThanOrEqual(acceptedDifference,
              `when counting for ${time} milliseconds,
               ${countUnit} differs by ${timeDifference} milliseconds`);
        });
      };

      timer.start();
      setTimeout(() =>  {
        timerCallback();
        /* wait with checking till restarted */
        setTimeout(() =>  {
          runIt();
          done();
        }, time);
      }, time);
    });

    afterEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
});
