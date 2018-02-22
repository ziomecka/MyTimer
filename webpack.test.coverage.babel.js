/* jshint esversion: 6 */
import merge from "webpack-merge";
import common from "./webpack.common.babel";

const istanbulLoader = {
  loader: "istanbul-instrumenter-loader",
  options: {produceSourceMap: false}
};

/* add istanbul-instrumenter-loader for karma coverage reports
  Done here because istanbul loader damages the sourcemap
  */
common.module.rules[0].use.unshift(istanbulLoader);

const settings = merge (common, {
  devtool: "inline-source-map"
});

export default settings;
