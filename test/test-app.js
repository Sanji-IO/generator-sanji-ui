'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('sanji-ui:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ someOption: true })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      '.editorconfig',
      '.eslintrc',
      '.gitignore',
      '.gitattributes',
      '.trvis.yml',
      'README.md',
      'webpack.config.js',
      'webpack.dev.js',
      'webpack.build.js',
      'app/app.js',
      'app/index.html',
      'server/dev-server.js'
    ]);
  });
});
