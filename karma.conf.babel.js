/* jshint esversion: 6 */
import path from "path";
import webpack from "./webpack.test.babel";
import options from "./karma.options";

delete webpack.entry;

/* Istanbul loader damages the sourcemap.
  So two versions of test are needed:
  - with coverage
  - with valid sourcemap
  */
const reporters = ["progress", "kjhtml"]; // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
const plugins = [
  "karma-jasmine",
  "karma-jasmine-jquery",
  "karma-jasmine-html-reporter",
  "karma-webpack",
  "karma-chrome-launcher",
  "karma-firefox-launcher",
  "karma-sourcemap-loader",
  "karma-babel-preprocessor"
];
const preprocessors = {
  "./spec/js/index.js": ["webpack", "sourcemap"],
};

options.reporters = reporters;
options.plugins = plugins;
options.preprocessors = preprocessors;
options.webpack = webpack;

const settings = function(config) {
  config.set(options);
};

export default settings;
