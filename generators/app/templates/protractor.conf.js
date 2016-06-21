'use strict';

require('babel-core/register')({
  ignore: /node_modules/
});

exports.config = {
  baseUrl: 'http://localhost:8080',

  seleniumAddress: 'http://localhost:4444/wd/hub',

  capabilities: {
    browserName: 'phantomjs',
    version: '',
    platform: 'ANY'
  },

  framework: 'cucumber',

  specs: [
    'features/*.feature'
  ],

  jasmineNodeOpts: {
    showColors: true
  },

  cucumberOpts: {
    require: 'features/component.step.js',
    format: 'pretty' // or summary
  }
};
