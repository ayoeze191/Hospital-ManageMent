const path = require("path");
const { postcss } = require("tailwindcss");
const webpack = require("webpack");
const CleanPlugin = require('clean-webpack-plugin')



module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "./static/ui"),
    filename: "[name].tsx",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader",'postcss-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
      },
    },
    {
      test: /\.svg/,
      use: [
        {
          loader: 'svg-url-loader',
          options: {
            encoding: "base64",
          },
        },
        
      ],
    },
    ],
  },
  
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
    new CleanPlugin.CleanWebpackPlugin()
  ],
};