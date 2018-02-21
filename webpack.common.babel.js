/* jshint esversion: 6 */
import path from "path";
import webpack from "webpack";

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
    new webpack.SourceMapDevToolPlugin({
      filename: "myTimer.js.map",
    }),
    new webpack.ProvidePlugin({
      "window.jQuery": "jquery"
    })
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
          /** istanbul-instrumenter-loader for karma coverage reports **/
          {
            loader: "istanbul-instrumenter-loader",
            options: {produceSourceMap: true}
          },
          {
            loader: "babel-loader",
            options: {presets: ["es2015"]}
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
