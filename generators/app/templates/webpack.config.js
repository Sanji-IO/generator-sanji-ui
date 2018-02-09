const path = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV;
const DEV_BASE_PATH = process.env.BASE_PATH;
const API_TOKEN = process.env.API_TOKEN;
const nodeRoot = path.join(__dirname, 'node_modules');
const appRoot = path.join(__dirname, 'src');
const config = {
  context: appRoot,
  output: {
    path: path.resolve(__dirname, '<%= uuid %>'),
    filename: '<%= appname %>.js'
  },
  resolve: {
    alias: {
      'angular-material.css': nodeRoot + '/angular-material/angular-material.css',
      'angular-material-icons.css': nodeRoot + '/angular-material-icons/angular-material-icons.css',
      'angular-material-data-table.css': nodeRoot + '/angular-material-data-table/dist/md-data-table.css',
      'angular-sanji-window.css': nodeRoot + '/angular-sanji-window/dist/angular-sanji-window.css',
      'easy-pie-chart': nodeRoot + '/easy-pie-chart/dist/angular.easypiechart.js',
      'toastr.css': nodeRoot + '/toastr/build/toastr.css'
    },
    extensions: ['.js', '.json', 'html', 'scss', 'css']
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'eslint-loader?fix', exclude: /node_modules/, enforce: 'pre' },
      { test: /\.js$/, use: 'babel-loader?cacheDirectory', exclude: /(node_modules)/ },
      { test: require.resolve('jquery'), loader: 'expose-loader?$!expose-loader?jQuery' },
      {
        test: /\.html$/,
        use: 'ng-cache-loader?prefix=[dir]/[dir]',
        exclude: [/node_modules/, path.join(__dirname, '/src/index.html')]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV || 'development')
      },
      __BASE_PATH__: JSON.stringify(DEV_BASE_PATH || '<%= apiBasePath %>'),
      __API_TOKEN__: JSON.stringify(API_TOKEN || '')
    })
  ]
};

module.exports = config;
