const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require('dotenv').config();

module.exports = {
  resolve: {
    alias: {
      Utils: path.resolve(__dirname, 'src/utils/'),
      Constants: path.resolve(__dirname, 'src/constants/'),
    },
  },
  entry: {
    app: path.resolve(__dirname, 'src/entries/app.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  devServer: {
    port: process.env.PORT || 9000,
    proxy: {
      '/api': process.env.API_URL || 'http://localhost:8000',
    },
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000000,
            fallback: 'file-loader',
            name: 'images/[name].[hash].[ext]',
          },
        },
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {
            limit: 1000,
            name: 'assets/images/[name].[ext]',
          },
        },
      },
      {
        test: /\.(json|geojson)$/,
        use: {
          loader: 'json-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL || ''),
    }),
  ],
};
