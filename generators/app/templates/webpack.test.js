const config = require('./webpack.config');
const bourbon = require('node-bourbon').includePaths;

config.devtool = 'source-map';
// Should be an empty object if it's generating a test build
// Karma will set this when it's a test build
config.entry = {
  main: './app.js'
};
// Should be an empty object if it's generating a test build
// Karma will handle setting it up for you when it's a test build
config.output = {};

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
  { test: /\.(png|jpg|gif|jpeg)$/, use: 'url-loader?limit=8192' },
  { test: /\.(woff|woff2)$/, use: 'url-loader?limit=10000&minetype=application/font-woff' },
  { test: /\.(ttf|eot|svg)$/, use: 'file-loader' }
].concat(config.module.rules);

module.exports = config;
