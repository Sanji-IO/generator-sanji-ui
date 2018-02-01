const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const bourbon = require('node-bourbon').includePaths;
const config = require('./webpack.config.js');

config.devtool = 'cheap-module-eval-source-map';
config.performance = {
  hints: false
};
config.entry = {
  'sanji-ui': ['webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080', './app.js']
};
config.module.rules = [
  {
    test: /\.scss/,
    use: [
      'style-loader',
      { loader: 'css-loader', options: { importLoaders: 1 } },
      'postcss-loader',
      {
        loader: 'sass-loader',
        options: {
          includePaths: bourbon
        }
      }
    ]
  },
  {
    test: /\.css$/,
    use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader']
  },
  { test: /\.(png|jpg|gif|jpeg)$/, use: 'url-loader?limit=8192', exclude: /node_modules/ },
  { test: /\.(woff|woff2)$/, use: 'url-loader?limit=10000&minetype=application/font-woff', exclude: /node_modules/ },
  { test: /\.(ttf|eot|svg)$/, use: 'file-loader', exclude: /node_modules/ }
].concat(config.module.rules);

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: 'index.html',
    hash: true
  })
);

module.exports = config;
