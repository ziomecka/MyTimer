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

let defs = new Defaults();

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
    it("allows to chain methods: start, pause and stop", () => {
      timer.start().pause().stop();
      expect(timer.status).toBe(timer._this.statuses.get("stopped"));
    });
  afterEach(() => {
    timer = null;
  });
});
