/* jshint esversion: 6 */
const settings = {
  basePath: "",
  files: [
    {pattern: "app/*.js", watched: true, served: false, included: false, nocache: false},
    {pattern: "spec/js/index.js", watched: true, served: true, included: true}
  ],
  singleRun: false,
  failOnEmptyTestSuite: false,
  // logLevel: config.LOG_DEBUG,
  frameworks: ["jasmine-jquery", "jasmine"],
  browsers: ["Chrome", "Firefox"],
  hostname: "localhost",
  autoWatch: true,
  port: 8082,
  retryLimit: 0,
  browserDisconnectTimeout: 99000,
  browserNoActivityTimeout: 99000,
  captureTimeout: 99000,
  client: {
    captureConsole: false,
    clearContext: false,
    runInParent: false,
    useIframe: true,
    jasmine:{
        random: false
    }
  },
  colors: true,
  webpackMiddleware: {
    noInfo: true, //turn off webpack bash output when run the tests
    stats: "errors-only"
  },
  webpackServer: {
    noInfo: true
  }
};

export default settings;
