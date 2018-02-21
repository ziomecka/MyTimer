/* jshint esversion: 6 */
import path from "path";
import webpackConfig from "./webpack.test.babel";

delete webpackConfig.entry;

const settings = function(config) {
  config.set({
    basePath: "",
    files: [
      {pattern: "app/*.js", watched: true, served: false, included: false, nocache: false},
      {pattern: "spec/js/index.js", watched: true, served: true, included: true}
    ],
    autoWatch: true,
    singleRun: false,
    failOnEmptyTestSuite: false,
    logLevel: config.LOG_DEBUG,
    frameworks: ["jasmine-jquery", "jasmine"],
    browsers: ["Chrome", "Firefox"],
    reporters: ["progress", "kjhtml", "coverage", "coverage-istanbul", "remap-coverage"],
    coverageReporter: {type: "in-memory"},
    remapCoverageReporter: {html: "./coverage"},
    hostname: "localhost",
    plugins: [
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
    ],
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
    preprocessors: {
      "./spec/js/index.js": ["webpack", "sourcemap", "coverage"]
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true, //turn off webpack bash output when run the tests
      stats: "errors-only"
    },
    webpackServer: {
      noInfo: true
    },
    coverageIstanbulReporter: {
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
    }
  });
};

export default settings;
