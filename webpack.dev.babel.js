/* jshint esversion: 6 */
import webpack from "webpack";
import merge from "webpack-merge";
import common from "./webpack.common.babel";

const settings = merge (common, {
  watch: true,
  devServer: {
    contentBase: "./bundle",
    compress: true,
    watchContentBase: true,
    watchOptions: {
      poll: true
    }
  }
});

export default settings;
