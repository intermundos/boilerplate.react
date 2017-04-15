const {resolve} = require('path');
const webpack = require('webpack');

// Ports and ENV
const PORT = process.env.PORT || 8888;
const appEnv = process.env.NODE_ENV || 'development'

// Paths
const srcPath = resolve('app')
const distPath = resolve('dist')
const nodeModules = resolve('node_modules')
const excludeNodeModules = /node_modules/

// Babel config
const babelConfig = require('../babel/babel.dev.config');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Config
const config = {
  context: srcPath,
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8888',
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  output: {
    path: distPath,
    publicPath: '/',
    filename: 'dev.bundle.js',
  },
  resolve: {
    modules: [
      srcPath,
      nodeModules
    ],
    extensions: ['.js', '.json', 'scss']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: srcPath,
        exclude: excludeNodeModules,
        loader: 'babel-loader',
        query: babelConfig
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              data: '@import "./static/sass/sassutils";',
              includePaths: [
                srcPath
              ]
            }
          },
        ]
      },
      {
        test: /\.(mp4|webm)(\?.*)?$/,
        include: [srcPath, nodeModules],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/video/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|woff2?|ttf|otf)(\?.*)?$/i,
        include: [srcPath, nodeModules],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5120,
              name: 'static/media/fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)(\?.*)?$/i,
        include: [srcPath, nodeModules],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5120,
              name: 'static/media/img/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },

  devServer: {
    hot: true,
    contentBase: srcPath,
    publicPath: '/',
    port: 8888,
    inline: true,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: '../static/index.html'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(appEnv)
    }),

  ]
};

module.exports = config;