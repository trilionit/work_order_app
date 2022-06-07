require("babel-polyfill");

const path = require("path");

module.exports = {
  node: {
    global: true,
  },
  entry: {
    bundle: "./src/bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  output: {
    filename: "[name]-min.js",
    path: path.resolve(__dirname, "public_html/js"),
    clean: true,
  },
};
