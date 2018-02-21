/* jshint esversion: 6 */
import webpack from "webpack";
import merge from "webpack-merge";
import common from "./webpack.common.babel";

const settings = merge (common, {
  plugins: [
    // new webpack.SourceMapDevToolPlugin({
    //   filename: 'myTimer.js.map',
    // })
  ],
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
