'use strict';

var config = require('./webpack.config');

config.devtool = 'source-map';
// Should be an empty object if it's generating a test build
// Karma will set this when it's a test build
config.entry = {};
// Should be an empty object if it's generating a test build
// Karma will handle setting it up for you when it's a test build
config.output = {};

config.module.loaders = [
  {test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192'},
  {test: /\.(woff|woff2)$/, loader: 'url?limit=10000&minetype=application/font-woff'},
  {test: /\.(ttf|eot|svg)$/, loader: 'file'}
].concat(config.module.loaders);

module.exports = config;
