/* jshint esversion: 6 */

function isNumber(value) {
  return (typeof value === "number" && !Number.isNaN(value));
}

function hOP(obj, property) {
  return {}.hasOwnProperty.call(obj, property);
}

function isObject(obj) {
  return Object(obj) === obj;
}

export default {
  isNumber: isNumber,
  hOP: hOP,
  isObject: isObject
};
