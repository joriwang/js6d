var path = require('path');
var ShebangPlugin = require('webpack-shebang-plugin');
var { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  target: "node",
  entry: {
    js6d: './src/index.ts',
  },
  output: {
    path: path.join(__dirname, "bin"),
    filename: "[name].js",
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  optimization: {
    minimize: true,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader"
        },
      },
    ],
  },

  plugins: [new ShebangPlugin(), new CleanWebpackPlugin()],
};