const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    popup: "./src/popup/popup.jsx",
    background: "./src/background.js",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve("./src/manifest.json"), to: path.resolve("dist") },
        { from: path.resolve("./src/images"), to: path.resolve("dist") },
        { from: path.resolve("./src/background.js"), to: path.resolve("dist") },
        // {
          // from: path.resolve("./src/actions/sign-in.js"),
          // to: path.resolve("dist"),
        // },
        { from: path.resolve("./src/popup.html"), to: path.resolve("dist") },
        // { from: path.resolve("./src/actions/fill_note.jsx"), to: path.resolve("dist") },
        // { from: path.resolve("./src/actions/scroll_to_plan.jsx"), to: path.resolve("dist") },
        {
          from: path.resolve("./src/actions/*"), // The crucial change
          to: path.resolve("dist/actions"), // Important: create an actions folder in dist
        },
      ],
    }),
    // new HtmlWebpackPlugin({
    //   title: "CPM extensions",
    //   filename: "popup.html",
    //   chunks: ["popup"],
    // }),
  ],
  resolve: {
    extensions: [
      // ".tsx", ".ts",
      ".js",
      ".jsx",
    ],
  },
  output: {
    filename: "[name].js",
  },
};
