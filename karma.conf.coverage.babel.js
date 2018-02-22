/* jshint esversion: 6 */
import path from "path";
import webpack from "./webpack.test.coverage.babel";
import options from "./karma.options";

delete webpack.entry;

/* Istanbul loader damages the sourcemap.
  So two versions of test are needed:
  - with coverage
  - with valid sourcemap
  */

const reporters = ["progress", "kjhtml", "coverage", "coverage-istanbul", "remap-coverage"];
const coverageReporter = {type: "in-memory"};
const remapCoverageReporter = {html: "./coverage"};
const plugins = [
  "karma-jasmine",
  "karma-jasmine-jquery",
  "karma-jasmine-html-reporter",
  "karma-coverage",
  "karma-coverage-istanbul-reporter",
  "karma-remap-coverage",
  "karma-webpack",
  "karma-chrome-launcher",
  "karma-firefox-launcher",
  "karma-sourcemap-loader",
  "karma-babel-preprocessor"
];
const preprocessors = {
  "./spec/js/index.js": ["webpack", "sourcemap", "coverage"],
};
const coverageIstanbulReporter = {
   // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
  reports: ["html", "lcovonly", "text-summary"],
   // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
  dir: path.join(__dirname, "coverage"),
   // if using webpack and pre-loaders, work around webpack breaking the source path
  fixWebpackSourcePaths: true,
  // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
  skipFilesWithNoCoverage: true,
  "report-config": {
    // all options available at: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
    includeAllSources: true,
    html: {
      // verbose: "verbose",
      subdir: "html",
      date: Date()
    }
  },
  thresholds: {
    emitWarning: true,
    global: { // thresholds for all files
      statements: 100,
      lines: 100,
      branches: 100,
      functions: 100
    },
    each: { // thresholds per file
      statements: 100,
      lines: 100,
      branches: 100,
      functions: 100,
      overrides: {
        "baz/component/**/*.js": {
          statements: 98
        }
      }
    }
  }
};

options.reporters = reporters;
options.coverageReporter = coverageReporter;
options.remapCoverageReporter = remapCoverageReporter;
options.plugins = plugins;
options.preprocessors = preprocessors;
options.coverageIstanbulReporter = coverageIstanbulReporter;
options.webpack = webpack;

const settings = function(config) {
  config.set(options);
};

export default settings;
