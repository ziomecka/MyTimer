/* jshint esversion: 6 */
/** requires all tests */
const tests = require.context('./', true, /\.spec.js$/);
tests.keys().forEach(tests);

// const options = {
//   control: document.getElementById("timer"),
//   display: {
//     milliseconds: document.getElementById("milliseconds"),
//     hours: document.getElementById("hours"),
//     minutes: document.getElementById("minutes"),
//     seconds: document.getElementById("seconds")
//   },
//   increase: [
//     {
//       element: document.getElementById("timer-increase-big"),
//       value: 10,
//       units: "hours"
//     },
//     {
//       element: document.getElementById("timer-increase-small"),
//       value: 10,
//       units: "minutes"
//     }
//   ],
//   decrease: [
//     {
//       element: document.getElementById("timer-decrease-big"),
//       value: 10,
//       units: "hours"
//     },
//     {
//       element: document.getElementById("timer-decrease-small"),
//       value: 10,
//       units: "minutes"
//     }
//   ],
//   smooth: "yes",
//   direction: "down",
//   session: {
//     value: 1,
//     units: "minutes"
//   },
//   interval: {
//     value: 1,
//     units: "milliseconds"
//   }
// };
//
// const t = new Timer(options);
