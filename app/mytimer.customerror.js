/* jshint esversion: 6 */

/**
 * Babel does not support extending builtins like Error or Array.
 * Error class ignores "this" and returns a completly new error.
 *
 * I tried to extend error with plugin: "babel-plugin-transform-builtin-extend".
 * It does not work under webpack.
 *
 * Firstly, I used approach described:
 * https://github.com/babel/babel/issues/3083
 * https://stackoverflow.com/questions/33870684/why-doesnt-instanceof-work-on-instances-of-error-subclasses-under-babel-node/33877501#33877501
 *
 */

function ObjectError(message, fileName, lineNumber) {
  var instance = new Error(message, fileName, lineNumber);
  Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, ObjectError);
  }
  return instance;
}

ObjectError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: ObjectError,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

export default ObjectError;
