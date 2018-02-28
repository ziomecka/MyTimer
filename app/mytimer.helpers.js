/* jshint esversion: 6 */

function isPositiveInteger(value) {
  /* is positive integer ? */
  return (Number.isInteger(value) && value >= 0);
}

function isObject(obj) {
  return Object(obj) === obj;
}

export {isPositiveInteger, isObject};
