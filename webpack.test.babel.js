/* jshint esversion: 6 */
import merge from "webpack-merge";
import common from "./webpack.common.babel";

const settings = merge (common, {
  devtool: "inline-source-map"
});

export default settings;
