const webpack = require('webpack');
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';

function getFileRelativePath(dir) {
  return path.join(__dirname, '..', dir);
}
module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].[hash].js',
    path: getFileRelativePath('dist'),
    chunkFilename: '[name].[chunkhash].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      'node_modules',
      getFileRelativePath('app'),
      getFileRelativePath('node_modules')
    ],
    alias: {
      app: getFileRelativePath('src'),
      models: getFileRelativePath('src/models'),
      utils: getFileRelativePath('src/utils'),
      layouts: getFileRelativePath('src/layouts'),
      pages: getFileRelativePath('src/pages'),
      constants: getFileRelativePath('src/constants'),
      components: getFileRelativePath('src/components'),
      services: getFileRelativePath('src/services'),
      styles: getFileRelativePath('src/styles')
    }
  },
  node: {
    fs: 'empty'
  },
  externals: [
    {
      './cptable': 'var cptable'
    }
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader?name=i/[name].[ext]'
      },
      {
        test: /\.pdf(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?minetype=application/pdf&name=[name].pdf'
      }
    ]
  }
};
