module.exports = {
  valid: {
    "validArguments": {
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
      tests: {
        startValues: {
          "hours": 0,
          "minutes": 5,
          "seconds": 0,
          "milliseconds": 0
        }
      }
    }
  },
  invalidDisplayUnits: {
    steps: {
      session: {
        value: 17,
        units: "minutes"
      },
      interval: {
        value: 21,
        units: "milliseconds"
      }
    },
    countUnits: ["invalid", "minutes", "seconds", "milliseconds"]
  },
  invalid: {
    "session units": {
      steps: {
        session: {
          value: 17,
          units: "invalid"
        },
        interval: {
          value: 21,
          units: "milliseconds"
        }
      },
      countUnits: ["hours", "minutes", "seconds", "milliseconds"]
    },
    "session value": {
      steps: {
        session: {
          value: "17",
          units: "hours"
        },
        interval: {
          value: 21,
          units: "milliseconds"
        }
      },
      countUnits: ["hours", "minutes", "seconds", "milliseconds"]
    },
    "interval units": {
      steps: {
        session: {
          value: 17,
          units: "milliseconds"
        },
        interval: {
          value: 21,
          units: "invalid"
        }
      },
      countUnits: ["hours", "minutes", "seconds", "milliseconds"]
    },
    "interval value": {
      steps: {
        session: {
          value: 17,
          units: "milliseconds"
        },
        interval: {
          value: "abc",
          units: "hours"
        }
      },
      countUnits: ["hours", "minutes", "seconds", "milliseconds"]
    }
  },
  lack: {
    "session units": {
      steps: {
        session: {
          value: 17
        },
        interval: {
          value: 21,
          units: "milliseconds"
        }
      },
      countUnits: ["hours", "minutes", "seconds", "milliseconds"]
    },
    "session value": {
      steps: {
        session: {
          units: "milliseconds"
        },
        interval: {
          value: 17,
          units: "milliseconds"
        }
      },
      countUnits: ["hours", "minutes", "seconds", "milliseconds"]
    },
    "interval units": {
      steps: {
        session: {
          value: 17,
          units: "seconds"
        },
        interval: {
          value: 21,
        }
      },
      countUnits: ["hours", "minutes", "seconds", "milliseconds"]
    },
    "interval value": {
      steps: {
        session: {
          value: 17,
          units: "seconds"
        },
        interval: {
          units: "milliseconds"
        }
      },
      countUnits: ["hours", "minutes", "seconds", "milliseconds"]
    },
  },
  "only some countUnits": {
    steps: {
      session: {
        value: 17,
        units: "seconds"
      },
      interval: {
        value: 21,
        units: "milliseconds"
      }
    },
    countUnits: ["hours", "seconds", "minutes"]
  }
};
