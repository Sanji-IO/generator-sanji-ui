'use strict';

var path = require('path');
var webpack = require('webpack');
var NODE_ENV = process.env.NODE_ENV;
var nodeRoot = path.join(__dirname, 'node_modules');
var appRoot = path.join(__dirname, 'app');
var config = {
  context: appRoot,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '<%= appname %>.js'
  },
  resolve: {
    root: [nodeRoot],
    // npm-linked packages can locate missing dependencies in app's node_modules
    fallback: nodeRoot,
    alias: {
      'angular-material.css': nodeRoot + '/angular-material/angular-material.css'
    },
    extensions: ['', '.js', '.json', 'html', 'scss', 'css']
  },
  module: {
    preLoaders: [
      {test: /\.js$/, loader: "eslint", exclude: /(node_modules)/}
    ],
    loaders: [
      {test: /\.js$/, loader: 'ng-annotate!babel', exclude: /(node_modules)/},
      {
        test: /\.js$/,
        loader: 'babel?optional[]=runtime&stage=0',
        include: /(angular-sanji-window)/
      },
      {
        test: /\.html$/,
        loader: 'ng-cache?prefix=[dir]/[dir]',
        include: /(angular-sanji-window)/
      },
      {test: /\.html$/, loader: 'ng-cache?prefix=[dir]/[dir]', exclude: /(node_modules)/}
    ],
    noParse: []
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __TEST__: 'test' === NODE_ENV,
      __DEV__: 'development' === NODE_ENV,
      __RELEASE__: 'production' === NODE_ENV
    }),
    new webpack.NoErrorsPlugin()
  ]
};

module.exports = config;
