const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
require('dotenv').config();

const isProd = (process.env.NODE_ENV === 'production');

const plugins = [
  new MiniCssExtractPlugin({
    filename: isProd ? 'app-[hash].css' : 'app.css',
  }),
  new HtmlWebpackPlugin({
    filename: './index.html',
    template: 'public/index.html',
    favicon: './public/favicon.ico',
    title: 'COVID Map | Luxelare',
  }),
  new webpack.DefinePlugin({
    'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:8000/api'),
  }),
];

if (isProd) {
  plugins.push(
    new CleanWebpackPlugin(),
  );
}

module.exports = {
  resolve: {
    alias: {
      Utils: path.resolve(__dirname, 'src/utils/'),
      Constants: path.resolve(__dirname, 'src/constants/'),
    },
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
  entry: {
    app: path.resolve(__dirname, 'src/entries/app.js'),
  },
  output: {
    path: isProd ? path.join(process.cwd(), './dist') : path.resolve(__dirname, 'dist'),
    filename: isProd ? 'app-[hash].js' : 'app.js',
    publicPath: './',
  },
  devServer: {
    port: process.env.PORT || 9000,
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
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
            name: 'images/[name].[ext]',
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
  plugins,
};
