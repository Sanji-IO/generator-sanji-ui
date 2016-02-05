'use strict';

var path = require('path');
var webpack = require('webpack');
var NODE_ENV = process.env.NODE_ENV;
var nodeRoot = path.join(__dirname, 'node_modules');
var appRoot = path.join(__dirname, 'app');
var config = {
  context: appRoot,
  output: {
    path: path.resolve(__dirname, '<%= uuid %>'),
    filename: '<%= appname %>.js'
  },
  resolve: {
    root: [nodeRoot],
    // npm-linked packages can locate missing dependencies in app's node_modules
    fallback: nodeRoot,
    alias: {
      'angular-material.css': nodeRoot + '/angular-material/angular-material.css',
      'angular-material-icons.css': nodeRoot + '/angular-material-icons/angular-material-icons.css',
      'angular-material-data-table.css': nodeRoot + '/angular-material-data-table/dist/md-data-table.css',
      'toastr.scss': nodeRoot + '/toastr/toastr.scss',
      'svg-morpheus': nodeRoot + '/svg-morpheus/compile/unminified/svg-morpheus.js'
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
        include: [
          /(angular-sanji-window)/,
          /(sanji-core-ui)/
        ]
      },
      { test: require.resolve("jquery"), loader: "expose?$!expose?jQuery" },
      { test: /\.json$/, loader: 'json', exclude: /node_modules\/(?!sanji-core-ui)/ },
      {
        test: /\.html$/,
        loader: 'ng-cache?prefix=[dir]/[dir]',
        include: [
          /(angular-sanji-window)/,
          /(sanji-core-ui)/
        ]
      },
      {test: /\.html$/, loader: 'raw', exclude: /(node_modules)/}
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
