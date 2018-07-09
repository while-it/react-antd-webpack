const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
function getFileRelativePath(dir) {
  return path.join(__dirname, '..', dir);
}
const getThemeConfig = require('../theme.js');
const theme = getThemeConfig();
/*
查看整个bundle的大小
*/
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../dist',
    hot: true,
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 2,
              localIdentNam: '[name]_[local]_[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader',
            options: {
              strictMath: false,
              noIeCompat: true,
              javascriptEnabled: true,
              modifyVars: theme
            }
          }
        ]
      }
    ]
  },
  performance: {
    hints: 'warning'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html'
      // favicon: 'favicon.ico'
    })
    // new BundleAnalyzerPlugin()
  ]
});
