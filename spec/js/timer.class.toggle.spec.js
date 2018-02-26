/* jshint esversion: 6 */

import Timer from "../../app/mytimer.class";
import scenariosInitialise from "../scenarios/timer.scenarios.initialise";

describe("Timer: ", () => {
  let timer = null;
  let counting = null;
  let stopped = null;
  let paused = null;
  let valid = scenariosInitialise.valid.validArguments;
  let method = null;

  beforeEach(() => {
    timer = new Timer(valid);
    counting = timer._this.statuses.get("counting");
    stopped = timer._this.statuses.get("stopped");
    paused = timer._this.statuses.get("paused");
  });

  it ("starts when initialised and then 'toggled' without argument", () => {
    expect(timer.status).toBe(stopped);
    timer.toggle();
    expect(timer.status).toBe(counting);
    timer.toggle();
    expect(timer.status).toBe(stopped);
  });

  it ("stops when started and then 'toggled' without argument", () => {
    timer.start();
    expect(timer.status).toBe(counting);
    timer.toggle();
    expect(timer.status).toBe(stopped);
    timer.toggle();
    expect(timer.status).toBe(counting);
  });

  it ("pauses when initialised and then 'toggled' with 'pause' argument", () => {
    method = "pause";
    expect(timer.status).toBe(stopped);
    timer.toggle(method);
    expect(timer.status).toBe(counting);
    timer.toggle(method);
    expect(timer.status).toBe(paused);
  });

  it ("pauses when started and then 'toggled' with 'pause' argument", () => {
    method = "pause";
    timer.start();
    expect(timer.status).toBe(counting);
    timer.toggle(method);
    expect(timer.status).toBe(paused);
    timer.toggle(method);
    expect(timer.status).toBe(counting);
  });

  it ("when initialised and 'toggled' with incorrect method name, warns in console and does not change status", () => {
    spyOn(console, "warn");
    method = "invalid";
    let warn = "this[method] is not a function";
    expect(timer.status).toBe(stopped);
    timer.toggle(method);
    expect(console.warn).toHaveBeenCalledWith(warn);
    expect(timer.status).toBe(stopped);
  });

  it ("when started and 'toggled' with incorrect method name, warns in console and does not change status", () => {
    spyOn(console, "warn");
    method = "invalid";
    let warn = "this[method] is not a function";

    timer.start();
    expect(timer.status).toBe(counting);
    timer.toggle(method);
    expect(console.warn).toHaveBeenCalledWith(warn);
    expect(timer.status).toBe(counting);
  });

  afterEach(() => {
    timer = null;
    counting = null;
    stopped = null;
    paused = null;
  });
});
