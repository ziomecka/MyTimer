/* jshint esversion: 6 */
import path from "path";

const settings = {
  context: path.join(__dirname, "app"),
  entry: {
    app: path.join(__dirname, "/app/index.js")
  },
  output: {
    filename: "./myTimer.bundle.js",
    path: path.join(__dirname, "/bundle")
  },
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
