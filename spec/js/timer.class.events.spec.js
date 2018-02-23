/* jshint esversion: 6 */

// TODO split between files
// TODO test creating and removing methods
// TODO test real counting
// TODO return correct values when stepChanged
// TODO test passing negative values - error expected
// TODO what if direction changes when ccounting?

import Defaults from "../../app/mytimer.defaults";
import Timer from "../../app/mytimer.class";

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
