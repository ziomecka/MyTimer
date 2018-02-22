/* jshint esversion: 6 */
import path from "path";
import webpack from "webpack";
import CleanWebpackPlugin from "clean-webpack-plugin";

const pathsToClean = ["bundle"];
const cleanOptions = {
  verbose:  true,
  dry:      true,
  allowExternal: false
};

const settings = {
  context: path.join(__dirname, "app"),
  entry: {
    app: path.join(__dirname, "/app/index.js")
  },
  output: {
    filename: "./myTimer.bundle.js",
    path: path.join(__dirname, "/bundle")
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions)
  ],
  resolve: {
    modules: ["node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        exclude: /(node_modules)|\.spec\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["es2015"]
            }
          },
          {
            loader: "jshint-loader"
          }
        ]
      },
      {
        test: /\.html$/,
        loader: "raw-loader"
      },
    ]
  }
};

export default settings;
