/* jshint esversion: 6 */

function isPositiveInteger(value) {
  /* is positive integer ? */
  return (Number.isInteger(value) && value >= 0);
}

function hOP(obj, property) {
  return {}.hasOwnProperty.call(obj, property);
}

function isObject(obj) {
  return Object(obj) === obj;
}

export default {
  isPositiveInteger: isPositiveInteger,
  hOP: hOP,
  isObject: isObject
};
