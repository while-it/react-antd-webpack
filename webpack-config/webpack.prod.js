const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

const ZipPlugin = require('zip-webpack-plugin');

const devMode =
  process.env.AppEnv === 'dev' || process.env.AppEnv === 'demo' ? '-demo' : '';

const getThemeConfig = require('../theme.js');
const theme = getThemeConfig();

module.exports = merge(common, {
  entry: {
    vendor: ['react', 'react-dom']
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
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
            loader: MiniCssExtractPlugin.loader
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
    hints: false
  },
  mode: 'production',
  devtool: false,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js($|\?)/i,
        exclude: /\/node_modules/,
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps,
        extractComments: true,
        warningsFilter: src => true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    minimize: true,
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      name: false,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist', 'build'], {
      root: process.cwd(),
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      // favicon: 'favicon.ico',
      chunks: ['app', 'vendor', 'manifest'],
      chunksSortMode: function(chunk1, chunk2) {
        return chunk1.id - chunk2.id;
      },
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ZipPlugin({
      path: path.join(__dirname, '..', 'build'),
      filename: 'risk-app.zip'
    })
  ]
});
