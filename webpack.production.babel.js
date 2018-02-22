/* jshint esversion: 6 */
import path from "path";
import webpack from "webpack";
import merge from "webpack-merge";
import common from "./webpack.common.babel";

import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import {BundleAnalyzerPlugin as BundleAnalyzerPlugin} from "webpack-bundle-analyzer";

/** remove istanbul-instrumenter-loader **/
// common.module.rules[0].use.shift();

const pathsToClean = ["production"];
const cleanOptions = {
  verbose:  true,
  dry:      true,
  allowExternal: false
};
const uglifyOptions =  {
  test: /\.js($|\?)/i,
  mangle: true,
  compress: {
    warnings: true,
    dead_code: true,
    pure_getters: true,
    properties: true
  },
  output: {
    comments: false
  },
  exclude: [/\.min\.js$/gi]
};

const compressionOptions = {
  asset: "[path].gz[query]",
  algorithm: "gzip",
  test: /\.js$/,
  threshold: 0,
  minRatio: 0
};
const chunkOptions = {
  name: "node-static",
  filename: "node-static.js",
  minChunks(module, count) {
    let context = module.context;
    return context && context.indexOf('node_modules') >= 0;
  }
};
const bundleAnalyseOptions = {
  analyzerMode: "static"
};

const settings = merge(common, {
  output: {
    filename: "./myTimer.bundle.js",
    path: path.join(__dirname, "/production"),
  },
  watch: false,
  cache: false,
  plugins: [
    new BundleAnalyzerPlugin(bundleAnalyseOptions),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    /**
     * I do not use new webpack.optimize.UglifyJsPlugin(uglifyOptions)
     * because of:
     * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
    */
    new UglifyJsPlugin({uglifyOptions: uglifyOptions}),
    new CompressionPlugin(compressionOptions),
    new webpack.optimize.CommonsChunkPlugin(chunkOptions),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
});

export default settings;
