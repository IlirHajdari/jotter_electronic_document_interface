const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./client/src/js/index.js",
      install: "./client/src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      historyApiFallback: true,
      port: 8080,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./client/index.html",
      }),
      new WebpackPwaManifest({
        name: "Jotter: Electronic Document Interface",
        short_name: "J.E.D.I",
        description: "A browser-based text editor.",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        start_url: "./",
        publicPath: "./",
        crossorigin: "use-credentials",
      }),
      new InjectManifest({
        swSrc: "./client/src-sw.js",
        swDest: "src-sw.js",
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
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
  };
};
