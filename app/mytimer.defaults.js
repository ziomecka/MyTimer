/* jshint esversion: 6 */
import helpers from "./mytimer.helpers";
import ObjectError from "./mytimer.customerror";
let isPositiveInteger = helpers.isPositiveInteger;
let hOP = helpers.hOP;

/**
 * TODO
 *
 * @type {Array}
 */
export default class defaults {
  constructor() {
    /**
    * Session - time that is counted down
    * Interval - interval at which the timer publishes the time.
     *
     * @type {Map} Stores default values in milliseconds
     */
    this.steps = new Map([
      ["session", 60000],
      ["interval", 1]
    ]);

    /**
     * Units in milliseconds.
     *
     * @type {Map}
     */
    this.units = new Map ([
      ["hours", 3600000],
      ["minutes", 60000],
      ["seconds", 1000],
      ["milliseconds", 1]
    ]);

    /**
     * User of timer can set the countUnits as desired.
     * E.g. only "hours" and "seconds" can be set.
     * Then the time will be allocated between hours and seconds
     * (see Create Methods below).
     *
     *  The Defaults have all countUnits.
     *
     * The countUnits are sorted from the longest to the shortest.
     * The sorting is important for smoothInterval method.
     *
     * @type {Array}
     */
    this._countUnits = [
      "hours",
      "minutes",
      "seconds",
      "milliseconds"
    ];

    this.statuses = new Map([
      ["stopped", Symbol("stopped")],
      ["counting", Symbol("counting")],
      ["paused", Symbol("paused")]
    ]);

    this.events = [
      "currentTime",
      "sessionChanged",
      "sessionStarted",
      "sessionStopped",
      "sessionPaused",
      "timerReset"
    ];

    this.listeners = {};

    /** set status to stop */
		this.status = this.statuses.get("stopped");
    this._direction = "down";

    /** Set the initial start and now values */
    this.start = Date.now();
		this.now = Date.now();

    this.createConversionMethods();
    this.time = this.timeCalculation();
  }

  set countUnits(arr) {
    /** Are countUnits correct?
        If true: set MyTimer's countUnits.
        Else: throw TypeError.
        */
    if (Array.isArray(arr) && arr.every((unit) => this.unitIsCorrect(unit))) {
      /** Sort countUnits from the longest to the shortest. */
      let order = Array.from(this.units.keys());
      this._countUnits = arr.sort((a, b) => order.indexOf(a) - order.indexOf(b));
      order = null;
      /** adjust methods */ // TODO when adjusting some methods should be deleted
      this.createConversionMethods();
    } else {
      throw TypeError("Timer has not been initialised because of incorrect argument countUnits.");
    }
  }

  get countUnits() {
    return this._countUnits;
  }

  /** Value should be in milliseconds. TODO */
  set session(obj) {
    try {
      this.steps.set("session", this.convert(obj));
    } catch (e) {
      throw new ObjectError (`Session step: ${e.message}.`);
    }
  }


  get session() {
    return this.steps.get("session");
  }

  /** Value should be in milliseconds. */
  set interval(obj) {
    try {
      this.steps.set("interval", this.convert(obj));
    } catch (e) {
      throw new ObjectError(`Interval step: ${e.message}.`);
    }
  }

  get interval() {
    return this.steps.get("interval");
  }

  get isCounting() {
    return this.status === this.statuses.get("counting");
  }

  set isCounting(value) {
    if (value === true) {  // TODO only in production
      this.status = this.statuses.get("counting");
    }
  }

  get isStopped() {
    return this.status === this.statuses.get("stopped");
  }

  set isStopped(value) {
    if (value === true) { // TODO only in production
      this.status = this.statuses.get("stopped");
    }
  }

  get isPaused() {
    return this.status === this.statuses.get("paused");
  }

  set isPaused(value) {
    if (value === true) { // TODO only in production
      this.status = this.statuses.get("paused");
    }
  }

  /** Calculate the elapsed time in milliseconds. */
  get ellapsed() {
    return (this.now - this.start);
    // let value = (this.now - this.start);
    // value = ((value > 0)? value : 0);
    // return value;
  }

  get direction() {
    return this._direction;
  }

  set direction(value) {
    this._direction = value;
    this.time = this.timeCalculation();
  }

  /** If timer counts down
      return the difference between session's length and the ellapsed time.
      Else assume that the timer counts up and
      return the ellapsed time.
      */
  timeCalculation() {
		if (this._direction === "down") {
      return () => (this.session - this.ellapsed);
    } else {
      return () => this.ellapsed;
    }
  }

  /** Make the interval not longer than the shortest countUnit */
  smoothInterval()  {
    /** The shortest countUnit is the last item of the countUnits (because it
        was sorted). Min store the milliseconds value. */
    const min = this.countUnits[this.countUnits.length - 1] / 2;

    /** Ensure that the interval is not too long */
    if (this.interval > min) {
      /** make it in milliseconds */
      this.interval = min * this.units[unit[0]];
    }
  }
  /**
  * Check: Has the obj the "value" property?
  *        Is the "value" property a Number?
  *        If the obj has the "unit" property then is it correct?
  *
  * @param   {Object}   obj  Object
  * @returns {Boolean}       If "value" is a number and
  *                              "units" are correct or there are no "units"
  *                              return true
  *                          Else throw Errors
  */
  verifyObject(obj) {
    // TODO step should be only integer
    if (!isPositiveInteger(obj.value)) {
      throw new ObjectError("Value is not a number");
    }
    if (obj.units && !this.unitIsCorrect(obj.units)) {
      throw new ObjectError("Unit is incorrect");
    }
    return true;
  }

  /**
   * Converts units.
   *
   * @param   {Object}   obj with "value" and "units" property
   * @returns {Number}       value in "units".
   *                         If argument has not "units" property then
   *                         return value in milliseconds.
   */
  convert(obj, step) {
    try {
      this.verifyObject(obj);
    } catch (e) {
      throw e;
    }

    // TODO only for development, not in production??
    if (!obj.units) {
      console.warn(`Since no units were given,
                    it was assumed that the value was given in milliseconds`);
    }
    return (obj.value * this.units.get(obj.units || "milliseconds"));
  }

  unitIsCorrect(unit) {
    return this.units.has(unit);
  }

  shortestCountUnit(units = this.countUnits) {
    let order = Array.from(this.units.keys()).reverse();
    for(let unit of order) {
      if (units.indexOf(unit) >= 0) {
        order = null;
        return unit;
      }
    }
    order = null;
  }

  createConversionMethods() {
    let arr = this._countUnits;
    arr.forEach((countUnit) => {
      /** get the previous, longer units i.e. if countUnits is "minutes" then get "hours".
          It is needed because the longer units should have consumed some time.
          */
      const index = arr.indexOf(countUnit);
      const previous = ((index > 0)? arr[index - 1] : null);
      const unitsPrevious = previous? this.units.get(previous) : null;
    	const unitsThis = this.units.get(countUnit);

      /**
       * Create timer's methods that calculate values countUnit.
       * It is done dynamically because the user can specify the timer countUnits.
       * E.g. only "hours" and "seconds" can be set.
       * Then the whole time will be allocated between hours and seconds.
       *
       * @type {[type]}
       * @return {Function}
       */
      this[countUnit] = (time) => {
        /** Check how much of the calculated time
            remains after it is allocated to the previous countUnit.
            E.g. if timer's countUnits include "hours" and "minutes" and
            the current countUnit is "minutes" then check
            how much time was allocated to "hours").
            */
    		const timeToBeAllocated = ((unitsPrevious !== null)? (time % unitsPrevious) : time);
        /** Allocate the remaining calculated time to the countUnit. */
    		return Math.floor((timeToBeAllocated / unitsThis));
    	};
    });
    arr = null;
  }

  /** For each countUnit create two methods:
      - returning the ellapsed time (in proper units: hours, minutes etc),
      - returning the length of the session (in proper units: hours, minutes etc).

      The method is stolen by MyTimer.class (via "call").
      To access the _countUnits MyTimer passes to the method the hidden object _this.
      */
  createTimeMethods(obj = this) {
		obj._countUnits.forEach((countUnit, index, arr) => {
      /** Create MyTimer's method that returns the ellapsed time. */
			this[`currentTime_${countUnit}`] = () => {
        return obj[countUnit](obj.time());
      };
      /** Create MyTimer's method that returns the length of the session. */
			this[`sessionLength_${countUnit}`] = () => {
        return obj[countUnit](obj.session);
      };
		});
  }
}
