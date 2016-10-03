const webpack = require('webpack');
const config = require('./webpack.config');
const autoprefixer = require('autoprefixer');
const bourbon = require('node-bourbon').includePaths;

config.devtool = 'source-map';
// Should be an empty object if it's generating a test build
// Karma will set this when it's a test build
config.entry = {};
// Should be an empty object if it's generating a test build
// Karma will handle setting it up for you when it's a test build
config.output = {};

config.module.rules = [
  {test: /\.scss/, loader: 'style!css!postcss!sass?includePaths[]=' + bourbon},
  {test: /\.css$/, loader: 'style!css!postcss'},
  {test: /\.(png|jpg|gif|jpeg)$/, loader: 'url-loader?limit=8192'},
  {test: /\.(woff|woff2)$/, loader: 'url?limit=10000&minetype=application/font-woff'},
  {test: /\.(ttf|eot|svg)$/, loader: 'file'}
].concat(config.module.rules);

config.plugins.push(
  new webpack.LoaderOptionsPlugin({
    options:{
      postcss: [
        autoprefixer({ browsers: ['last 2 versions'] })
      ]
    }
  })
);

module.exports = config;
