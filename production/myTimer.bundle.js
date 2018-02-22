webpackJsonp([0],{125:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={isPositiveInteger:function(t){return Number.isInteger(t)&&t>=0},hOP:function(t,e){return{}.hasOwnProperty.call(t,e)},isObject:function(t){return Object(t)===t}}},126:function(t,e,n){"use strict";function s(t,e,n){var i=new Error(t,e,n);return Object.setPrototypeOf(i,Object.getPrototypeOf(this)),Error.captureStackTrace&&Error.captureStackTrace(i,s),i}Object.defineProperty(e,"__esModule",{value:!0}),(s.prototype=Object.create(Error.prototype)).constructor=s,e.default=s},127:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s,i=n(128),r=(s=i)&&s.__esModule?s:{default:s};e.default={MyTimer:r.default}},128:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var s=e[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,n,s){return n&&t(e.prototype,n),s&&t(e,s),e}}();n(129);var i=u(n(331)),r=u(n(125)),o=u(n(126));function u(t){return t&&t.__esModule?t:{default:t}}var a=r.default.hOP,c=r.default.isObject,l=new WeakMap,h=function(t){return l.set(t,new i.default),function(){return l.get(t)}},f=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var n,s=h(this)();if(this._this=s,e&&c(e)){if(a(e,"steps")&&c(e.steps)){var i=!0,r=!1,u=void 0;try{for(var l,f=s.steps.keys()[Symbol.iterator]();!(i=(l=f.next()).done);i=!0){var v=l.value,d=e.steps[v];if(d&&c(d))try{s[v]=d,"interval"===v&&"yes"===s.smooth&&s.smoothInterval()}catch(t){t.constructor===o.default&&console.warn("Timer has been initialised with different values than those specified in constructor's call.\n                              It is due to the received error:\n                              '"+t.message+"'")}else console.warn("Timer has been initialised with different values than those specified in constructor's call.");d=null}}catch(t){r=!0,u=t}finally{try{!i&&f.return&&f.return()}finally{if(r)throw u}}}if(a(e,"direction")&&(s.direction=e.direction),a(e,"countUnits"))try{s.countUnits=e.countUnits}catch(t){throw t}}s.createTimeMethods.call(this,s),this.event=(n=s.listeners,s.events.forEach(function(t){return n[t]=[]}),{subscribe:function(t,e,s){var i=n[e].push({listener:t,method:s})-1;return{remove:function(){return delete n[e][i]}}},publish:function(t){n[t].forEach(function(t){t.listener[t.method]()})}})}return s(t,[{key:"start",value:function(){var t=this,e=l.get(this);e.start=Date.now();return e.isCounting?(e=null,!1):(e.start=Date.now(),e.isCounting=!0,e.countDown=setInterval((e.now=Date.now(),t.event.publish("currentTime"),void(e.ellapsed>=e.session&&(e=null,t.stop()))),e.interval),this.event.publish("sessionStarted"),this)}},{key:"stop",value:function(){var t=l.get(this);if(t.isCounting){var e=Date.now(),n=t.start+t.session,s=t.countDown;t.now=e>n?n:e,s&&clearInterval(s),t.countDown=null}return t.isStopped=!0,t=null,this.event.publish("sessionStopped"),t=null,this}},{key:"pause",value:function(){var t=l.get(this);if(t.isCounting){var e=t.countDown;return t.now=Date.now(),t.isPaused=!0,e&&clearInterval(e),t=null,this.event.publish("sessionPaused"),this}return t=null,!1}},{key:"reset",value:function(){var t=l.get(this);this.stop(),t.start=Date.now(),t.now=Date.now(),t=null,this.event.publish("timerReset")}},{key:"changeStep",value:function(t){var e=this,n=l.get(this),s=t.step;if(!n.steps.has(s)||!t)throw Error("Step has not been changed becuse of incorrect arguments.");var i,r=void 0,o=void 0;o=t.increment,1!==(r=t.sign)&&-1!==r&&(r=1),0!==o&&1!==o&&(o=0),i=n.convert(t)*r+n[s]*o,{session:function(t){n[s]={value:t},e.event.publish("sessionChanged"),e.event.publish("currentTime")},interval:function(){}}[s](i),n=null}},{key:"toggle",value:function(){this[arguments.length>0&&void 0!==arguments[0]?arguments[0]:"pause"]()||this.start()}},{key:"status",get:function(){return l.get(this).status}},{key:"session",get:function(){return l.get(this).session}}]),t}();e.default=f},331:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var s=e[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,n,s){return n&&t(e.prototype,n),s&&t(e,s),e}}(),i=o(n(125)),r=o(n(126));function o(t){return t&&t.__esModule?t:{default:t}}var u=i.default.isPositiveInteger,a=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.steps=new Map([["session",6e4],["interval",1]]),this.units=new Map([["hours",36e5],["minutes",6e4],["seconds",1e3],["milliseconds",1]]),this._countUnits=["hours","minutes","seconds","milliseconds"],this.statuses=new Map([["stopped",Symbol("stopped")],["counting",Symbol("counting")],["paused",Symbol("paused")]]),this.events=["currentTime","sessionChanged","sessionStarted","sessionStopped","sessionPaused","timerReset"],this.listeners={},this.status=this.statuses.get("stopped"),this._direction="down",this.start=Date.now(),this.now=Date.now(),this.createConversionMethods(),this.time=this.timeCalculation()}return s(t,[{key:"timeCalculation",value:function(){var t=this;return"down"===this._direction?function(){return t.session-t.ellapsed}:function(){return t.ellapsed}}},{key:"smoothInterval",value:function(){var t=this.countUnits[this.countUnits.length-1]/2;this.interval>t&&(this.interval=t*this.units[unit[0]])}},{key:"verifyObject",value:function(t){if(!u(t.value))throw new r.default("Value is not a number");if(t.units&&!this.unitIsCorrect(t.units))throw new r.default("Unit is incorrect");return!0}},{key:"convert",value:function(t,e){try{this.verifyObject(t)}catch(t){throw t}return t.units||console.warn("Since no units were given,\n                    it was assumed that the value was given in milliseconds"),t.value*this.units.get(t.units||"milliseconds")}},{key:"unitIsCorrect",value:function(t){return this.units.has(t)}},{key:"shortestCountUnit",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.countUnits,e=Array.from(this.units.keys()).reverse(),n=!0,s=!1,i=void 0;try{for(var r,o=e[Symbol.iterator]();!(n=(r=o.next()).done);n=!0){var u=r.value;if(t.indexOf(u)>=0)return e=null,u}}catch(t){s=!0,i=t}finally{try{!n&&o.return&&o.return()}finally{if(s)throw i}}e=null}},{key:"createConversionMethods",value:function(){var t=this,e=this._countUnits;e.forEach(function(n){var s=e.indexOf(n),i=s>0?e[s-1]:null,r=i?t.units.get(i):null,o=t.units.get(n);t[n]=function(t){return Math.floor((null!==r?t%r:t)/o)}}),e=null}},{key:"createTimeMethods",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this;e._countUnits.forEach(function(n,s,i){t["currentTime_"+n]=function(){return e[n](e.time())},t["sessionLength_"+n]=function(){return e[n](e.session)}})}},{key:"countUnits",set:function(t){var e=this;if(!Array.isArray(t)||!t.every(function(t){return e.unitIsCorrect(t)}))throw TypeError("Timer has not been initialised because of incorrect argument countUnits.");var n=Array.from(this.units.keys());this._countUnits=t.sort(function(t,e){return n.indexOf(t)-n.indexOf(e)}),n=null,this.createConversionMethods()},get:function(){return this._countUnits}},{key:"session",set:function(t){try{this.steps.set("session",this.convert(t))}catch(t){throw new r.default("Session step: "+t.message+".")}},get:function(){return this.steps.get("session")}},{key:"interval",set:function(t){try{this.steps.set("interval",this.convert(t))}catch(t){throw new r.default("Interval step: "+t.message+".")}},get:function(){return this.steps.get("interval")}},{key:"isCounting",get:function(){return this.status===this.statuses.get("counting")},set:function(t){!0===t&&(this.status=this.statuses.get("counting"))}},{key:"isStopped",get:function(){return this.status===this.statuses.get("stopped")},set:function(t){!0===t&&(this.status=this.statuses.get("stopped"))}},{key:"isPaused",get:function(){return this.status===this.statuses.get("paused")},set:function(t){!0===t&&(this.status=this.statuses.get("paused"))}},{key:"ellapsed",get:function(){return this.now-this.start}},{key:"direction",get:function(){return this._direction},set:function(t){this._direction=t,this.time=this.timeCalculation()}}]),t}();e.default=a}},[127]);