/* jshint esversion: 6 */
import "babel-polyfill";
import Defaults from "./mytimer.defaults";
import {isObject} from "./mytimer.helpers";
import ObjectError from "./mytimer.customerror";
import messages from "./mytimer.messages";

/** @type {WeakMap} Used to store private objects */
const _privateObjects = new WeakMap();
/**
 * WeakMap that stores MyTimers' private objects.
 * Those objects are instances of MyTimer's Defaults.
 * The WeakMap returns function, that returns those private objects.
 *
 * @param   {MyTimer}   obj Instance of MyTimer.
 * @returns {Function}      Function that returns the private object.
 */
const createPrivateObject = (obj) => {
  _privateObjects.set(obj, new Defaults());
  return () => _privateObjects.get(obj);
};

export default class MyTimer {
  /**
   * [constructor description] //TODO
   *
   * @param  {Object}   timerOptions TODO
   */
  constructor(timerOptions) {
    /** Create private object (Defaults) via the WeakMap. */
    let _this = createPrivateObject(this)();
    /** Reveal the private object. ONLY FOR TESTS. */
    this._this = _this;

    /** verify arguments */
    if (timerOptions && isObject(timerOptions)) {
      /** verify session and interval steps */
      if (isObject(timerOptions.steps)) {
        for (let step of _this.steps.keys()) {
          let options = timerOptions.steps[step];
          /** Check:
              are there options?
              are options an object?
              */
          if (options && isObject(options)) {
            try {
              _this[step] = options;
              /** Adjust interval value. Done here, because:
                  if interval step is set incorrectly then
                  the Error will be caught and smoothing will not be performed.
                  **/
              if (step === "interval" && _this.smooth === "yes") {
                _this.smoothInterval();
              }
            } catch(e) {
              /** Warn: initialised with defaults. */
              if (e.constructor === ObjectError) {
                console.warn(messages.initialisedWithDefaults);
              }
            }
          } else {
            /** Warn: initialised with defaults. */
            console.warn(messages.initialisedWithDefaults);
          }
          /** Garbage collect */
          options = null;
        }
      }

      /** Set MyTimer's counting direction */
      if(timerOptions.direction)  {
        try {
          _this.direction = timerOptions.direction;
        } catch (e) {
          /** Warn: initialised with defaults. */
          console.warn(messages.initialisedWithDefaults);
        }
      }

      /** Are countUnits provided in arguments? */ // TODO is the check needed??
        try {
          _this.countUnits = timerOptions.countUnits;
        } catch (e) {
          if (e.constructor === ObjectError) {
            console.warn(messages.initialisedWithDefaults);
        }
      }
    }

    /** Steal "createTimeMethods" from the hidden object in order to
        create MyTimer's methods that will return time values.
        */
    _this.createTimeMethods.call(this, _this);

    /** Create MyTimer's events. */
    this.event = (() => {
      let listeners = _this.listeners;
      return {
        subscribe: (listener, eventName, method) => {
          // TODO check if eventName is correct
          const index = listeners[eventName].push({listener: listener, method: method}) - 1;
          return () => delete listeners[eventName][index];
        },
        publish: (eventName) => {
          listeners[eventName].forEach((listener) => {
            listener.listener[listener.method]();
          });
        },
        unsubscribe: (events =  _privateObjects.get(this).events) => {
          events.forEach((eventName) => {
            Object.keys(listeners[eventName]).forEach((index) => {
              delete listeners[eventName][index];
            });
          });
          return true;
        }
      };
    })();
    _this = null;
  }

  start() {
    /** Start the timer only if it has not been counting already. */
    if (!_privateObjects.get(this).is_counting) {
      let _this = _privateObjects.get(this);
      /** Function tha publishes currentTime. It is called at intervals.*/
      let publishTime = () => {
        if (!_this.isEllapsed) {
          _this.now = Date.now();
          this.event.publish("currentTime");
        } else {
          this.stop();
        }
      };
      /** If the timer has not been paused then start counting from Date.now().
          If the time has been paused one cannot change the start time!
          */
      if(!_this.is_paused) {
        this.reset();
      } else {
        _this.zeroTimes();
      }
      _this.is_counting = true;
      /** Publish time at predefined intervals. */
      _this.countDown = setInterval(publishTime, _this.interval);
      /** The method clears interval and dereferences _this.
          It is done to avoid the memory leak.
          */
      _this.removeCountDown = () => { //TUTAJ
        if (_this.countDown) {
          clearInterval(_this.countDown);
          delete _this.countDown;
        }
        _this = null;
        publishTime = null;
      };
      this.event.publish(["sessionStarted"]);
      if (_this.safeMode) this.event.unsubscribe(["sessionStarted"]);
      return this;
    } else {
      return false;
    }
  }

  stop() {
    let _this = _privateObjects.get(this);
    if (_this.is_counting || _this.is_paused) {
      _this.cumulateEllapsed();
      _this.is_stopped = true;
      _this.removeCountDown();
      delete _this.removeCountDown;
      /** garbage collection */
      this.event.publish("sessionStopped");
      if (_this.safeMode) this.event.unsubscribe(["currentTime", "sessionPaused", "sessionStopped"]);
      _this = null;
      return this;
    }
    _this = null;
    return false;
  }

  pause() {
    let _this = _privateObjects.get(this);
    if (_this.is_counting) {
      _this.cumulateEllapsed();
      _this.is_paused = true;
      _this.removeCountDown();
      /** garbage collection */
      this.event.publish("sessionPaused");
      if (_this.safeMode) this.event.unsubscribe(["sessionPaused"]);
      _this = null;
      return this;
    }
    _this = null;
    return false;
  }

  reset() {
    let _this = _privateObjects.get(this);
    _this.reset();
    this.event.publish("timerReset");
    if (_this.safeMode) this.event.unsubscribe(["timerReset"]);
    _this = null;
  }

  /**
  * Changes value of step (interval, session).
  *
  * @param   {object}   options Object with mandatory properties:
  *                             "step", "value" and
  *                             optional properties:
  *                             "units", "sign" and "increment".
  */
  changeStep(options) {
    let _this = _privateObjects.get(this);
    let step = options.step;
    /** If options received AND the step is correct perform change,
        else: throw Error.
        */
    if (options && (_this.steps.has(step))) {
      let value, sign, increment;
      /** Get options values */
      ({sign: sign, increment: increment} = options);
      /** If sign is neither 1 nor -1, make it 1. */
      if (sign !== 1 && sign !== -1) sign = 1;
      /** If increment is neither 0 nor 1, make it 0. */
      if (increment !== 0 && increment !== 1) increment = 0;

      /* Change step only if increase, OR
        decrease AND the step being changed is longer then 0.
        */
      if (sign > 0 || (sign < 0 && _this[step] > 0) ) {
        /** Calculate new step value: include current value if increment === 1 and
            add / substract new value depending on the sign.
            The convert method will check if the value and units are correct.
            */
        value = _this.convert(options) * sign + _this[step] * increment;
        /** Step's length cannot be negative.
            Check the sign here. If the sign was not checked and
            negative value was passed to the session's and interval's setters,
            then an error would be thrown.
            */
        if (value < 0) value = 0;

        /** Steps' procedures */
        let stepProcedure = {
          "session": (value) => {
            /** Set the session's length if:
                - timer is not counting and is not paused, OR
                - timer is counting or is paused AND the new session length is longer than the time ellapsed.
                */
            if ((!_this.is_counting && !_this.is_paused) || (value > (_this.ellapsed))) {
              _this[step] = {value: value};
              this.event.publish("sessionChanged");
            }
          },
          "interval": () => {
            // TODO
          }
        };
        stepProcedure[step](value);
        /** garbage collect */
        _this = null;
        return true;
      } else {
        /** garbage collect */
        _this = null;
        return false;
      }
    } else {
      _this = null;
      throw Error (messages.stepNotChanged);
    }
	}

  toggle(method = "stop") {
    try {
      if(!this[method]()) {
        this.start();
      }
    } catch(e) {
      console.warn(e.message);
    }
	}

  get status() {
    return _privateObjects.get(this).status;
  }

  get session() {
    return _privateObjects.get(this).session;
  }

  get ellapsed() {
    return _privateObjects.get(this).ellapsed;
  }

  safeMode(value = true) {
    _privateObjects.get(this).safeMode = value;
  }

  unsubscribe() {
    return this.event.unsubscribe();
  }

  destroy() {
    this.unsubscribe();
    return _privateObjects.delete(this);
  }
}
