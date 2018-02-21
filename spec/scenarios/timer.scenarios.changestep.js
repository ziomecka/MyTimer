/* jshint esversion: 6 */

const scenarios = {
  sessionStep: [
    {
      step: "session",
      value: 1,
      units: "minutes",
      increment: 1
    },
    {
      step: "session",
      value: 1,
      units: "milliseconds",
      increment: 1,
      sign: 2
    },
    {
      step: "session",
      value: 100,
      units: "seconds"
    },
    {
      step: "session",
      value: 1,
      units: "minutes",
      increment: 1,
      sign: -1
    },
    {
      step: "session",
      value: 1,
      units: "hour",
      increment: 0
    },
    {
      step: "session",
      value: 10,
      units: "minutes",
      increment: 0,
      sign: -1
    }
  ],
  intervalStep: [],
  invalidStep: [
    {
      step: "invalid",
      value: 1,
      units: "minutes",
      increment: 1
    }
  ]
};

export default scenarios;
