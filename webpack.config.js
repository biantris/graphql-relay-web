const { resolve } = require("path");
const dotEnv = require('dotenv-webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

const config = {
  mode: isProd ? "production" : "development",
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new dotEnv({
      path: './.env',
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
};

if (isProd) {
    config.optimization = {
      minimizer: [new TerserWebpackPlugin()],
    };
  } else {
    config.devServer = {
      port: 8000,
      open: true,
      hot: true,
      compress: true,
      stats: "errors-only",
      overlay: true,
    };
  }
  
  module.exports = config;