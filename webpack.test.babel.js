/* jshint esversion: 6 */
import merge from "webpack-merge";
import common from "./webpack.common.babel";
import webpack from "webpack";

common.plugins.shift();

const settings = merge (common, {
  devtool: "inline-source-map"
});

export default settings;
