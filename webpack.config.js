const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
require('dotenv').config();

const isProd = (process.env.NODE_ENV === 'production');

const plugins = [
  new MiniCssExtractPlugin({
    filename: isProd ? 'assets/app-[hash].css' : 'assets/app.css',
  }),
  new HtmlWebpackPlugin({
    filename: './index.html',
    template: 'public/index.html',
    favicon: './public/favicon.ico',
    title: 'COVID Map | Luxelare',
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
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
  entry: {
    app: path.resolve(__dirname, 'src/entries/app.js'),
  },
  output: {
    path: isProd ? path.join(process.cwd(), './dist') : path.resolve(__dirname, 'dist'),
    filename: isProd ? 'assets/app-[hash].js' : 'assets/app.js',
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
            name: 'assets/images/[name].[ext]',
          },
        },
      },
    ],
  },
  plugins,
};
