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
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions)
  ]
});

export default settings;
