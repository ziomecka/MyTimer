/* jshint esversion: 6 */
import Defaults from "../../app/assets/js/mytimer.defaults";
let convert = Defaults.prototype.convert;

let  scenarios = [
  {
    settings: {
      steps: {
        session: {
          value: 5,
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
    countingTime: 10,
    results: {
      "hours": 0,
      "minutes": 0,
      "seconds": 0,
      "milliseconds": 10
    }
  },
  {
    settings: {
      steps: {
        session: {
          value: 5,
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
    countingTime: 10005,
    results: {
      "hours": 0,
      "minutes": 0,
      "seconds": 10,
      "milliseconds": 5
    }
  },
  {
    settings: {
      steps: {
        session: {
          value: 5,
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
    countingTime: 66005,
    results: {
      "hours": 0,
      "minutes": 1,
      "seconds": 6,
      "milliseconds": 5
    }
  },
  {
    settings: {
      steps: {
        session: {
          value: 2,
          units: "minutes"
        },
        interval: {
          value: 1,
          units: "milliseconds"
        }
      },
      countUnits: ["hours", "minutes", "seconds", "milliseconds"],
      direction: "down"
    },
    countingTime: 30002,
    results: {
      "hours": 0,
      "minutes": 1,
      "seconds": 29,
      "milliseconds": 998
    }
  },
  {
    settings: {
      steps: {
        session: {
          value: 2,
          units: "minutes"
        },
        interval: {
          value: 1,
          units: "milliseconds"
        }
      },
      countUnits: ["minutes", "milliseconds"],
      direction: "up"
    },
    countingTime: 61102,
    results: {
      "minutes": 1,
      "milliseconds": 1102
    }
  },
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
      direction: "down"
    },
    countingTime: 60000,
    results: {
      "hours": 0,
      "minutes": 0,
      "seconds": 0,
      "milliseconds": 0
    },
    acceptedDifference: 0
  }
];

export default scenarios;
