/* jshint esversion: 6 */
import merge from "webpack-merge";
import common from "./webpack.common.babel";
import path from "path";
import CleanWebpackPlugin from "clean-webpack-plugin";

const pathsToClean = ["bundle"];
const cleanOptions = {
  verbose:  true
};

const settings = merge (common, {
  devtool: "cheap-source-map",
  output: {
    filename: "./myTimer.bundle.js",
    path: path.resolve(__dirname, "bundle")
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions)
  ]
});

export default settings;
