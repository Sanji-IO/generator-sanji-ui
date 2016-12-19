const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const bourbon = require('node-bourbon').includePaths;
const config = require('./webpack.config.js');

config.devtool = 'cheap-module-eval-source-map';
config.performance = {
  hints: false
};
config.entry = {
  'sanji-ui': [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    './app.js'
  ]
};
config.module.rules = [
  {test: /\.js$/, use: 'ng-annotate-loader', exclude: /(node_modules)/, enforce: 'post'},
  {
    test: /\.scss/,
    use: ['style-loader', 'css-loader', 'postcss-loader', {
      loader: 'sass-loader',
      options: {
        includePaths: bourbon
      }
    }]
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader', {
      loader: 'postcss-loader',
      options: {
        browsers: 'last 2 versions'
      }
    }]
  },
  {test: /\.(png|jpg|gif|jpeg)$/, use: 'url-loader?limit=8192', exclude: /node_modules/},
  {test: /\.(woff|woff2)$/, use: 'url-loader?limit=10000&minetype=application/font-woff', exclude: /node_modules/},
  {test: /\.(ttf|eot|svg)$/, use: 'file-loader', exclude: /node_modules/}
].concat(config.module.rules);

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.LoaderOptionsPlugin({
    debug: true,
    options: {
      postcss: [
        autoprefixer({ browsers: ['last 2 versions'] })
      ]
    }
  }),
  new HtmlWebpackPlugin({
    template: 'index.html',
    hash: true
  })
);

module.exports = config;
