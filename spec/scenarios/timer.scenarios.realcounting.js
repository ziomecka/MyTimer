/* jshint esversion: 6 */
import Defaults from "../../app/mytimer.defaults";
let convert = Defaults.prototype.convert;

let  scenarios = [
  {
    settings: {
      steps: {
        session: {
          value: 1,
          units: "minutes"
        },
        interval: {
          value: 1,
          units: "milliseconds"
        }
      },
      countUnits: ["hours", "minutes", "seconds", "milliseconds"],
      direction: "up"
    },
    countingTime: 28,
    results: {
      "hours": 0,
      "minutes": 0,
      "seconds": 0,
      "milliseconds": 28
    }
  }
];

export default scenarios;
