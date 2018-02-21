/* jshint esversion: 6 */
import merge from "webpack-merge";
import common from "./webpack.common.babel";
import {BundleAnalyzerPlugin as BundleAnalyzerPlugin} from "webpack-bundle-analyzer";

const settings = merge(common, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static"
    })
  ]
});

export default settings;
