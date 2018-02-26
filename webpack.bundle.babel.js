/* jshint esversion: 6 */
import merge from "webpack-merge";
import common from "./webpack.common.babel";
import CleanWebpackPlugin from "clean-webpack-plugin";

const pathsToClean = ["bundle"];
const cleanOptions = {
  verbose:  true,
  dry:      true,
  allowExternal: false
};

const settings = merge (common, {
  output: {
    filename: "./myTimer.bundle.js",
    path: path.join(__dirname, "/bundle")
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions)
  ]
});

export default settings;
