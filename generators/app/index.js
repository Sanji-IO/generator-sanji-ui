'use strict';
var path = require('path');
var url = require('url');
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var npmName = require('npm-name');
var superb = require('superb');
var _ = require('lodash');
var _s = require('underscore.string');

var proxy = process.env.http_proxy ||
  process.env.HTTP_PROXY ||
  process.env.https_proxy ||
  process.env.HTTPS_PROXY ||
  null;

var githubOptions = {
  version: '3.0.0'
};

if (proxy) {
  var proxyUrl = url.parse(proxy);

  githubOptions.proxy = {
    host: proxyUrl.hostname,
    port: proxyUrl.port
  };
}

var GitHubApi = require('github');
var github = new GitHubApi(githubOptions);

if (process.env.GITHUB_TOKEN) {
  github.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_TOKEN
  });
}

var extractGeneratorName = function (appname) {
  var match = appname.match(/^sanji-(.+)/);

  if (match && match.length === 2) {
    return match[1].toLowerCase();
  }

  return appname;
};

var emptyGithubRes = {
  name: '',
  email: '',
  html_url: ''
};

var githubUserInfo = function (name, cb, log) {
  github.user.getFrom({
    user: name
  }, function (err, res) {
    if (err) {
      log.error('Cannot fetch your github profile. Make sure you\'ve typed it correctly.');
      res = emptyGithubRes;
    }

    cb(JSON.parse(JSON.stringify(res)));
  });
};

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('flat', {
      type: Boolean,
      required: true,
      defaults: true,
      desc: 'When specified, generators will be created at the top level of the project.'
    });
  },

  initializing: function () {
    this.pkg = require('../../package.json');
    this.currentYear = (new Date()).getFullYear();
    this.config.set('structure', this.options.flat ? 'flat' : 'nested');
    this.generatorsPrefix = this.options.flat ? '' : 'generators/';
    this.appGeneratorDir = this.options.flat ? 'app' : 'generators';
  },

  prompting: {
    askFor: function () {
      var done = this.async();

      this.log(yosay('Create your own ' + chalk.red('Sanji UI') + ' with superpowers!'));

      var prompts = [{
        name: 'githubUser',
        message: 'Would you mind telling me your username on GitHub?',
        default: 'someuser'
      }];

      this.prompt(prompts, function (props) {
        this.githubUser = props.githubUser;
        done();
      }.bind(this));
    },

    askForGeneratorName: function () {
      var done = this.async();
      var generatorName = extractGeneratorName(this.appname);

      var prompts = [{
        name: 'generatorName',
        message: 'What\'s the base name of your project? Prefix "sanji-" is already exist.',
        default: generatorName
      }, {
        type: 'confirm',
        name: 'askNameAgain',
        message: 'The name above already exists on npm, choose another?',
        default: true,
        when: function (answers) {
          var done = this.async();
          var name = 'sanji-' + answers.generatorName;

          npmName(name, function (err, available) {
            if (!available) {
              done(true);
            }

            done(false);
          });
        }
      }];

      this.prompt(prompts, function (props) {
        if (props.askNameAgain) {
          return this.prompting.askForGeneratorName.call(this);
        }

        this.generatorName = props.generatorName;
        this.appname = _s.slugify('sanji-' + this.generatorName);

        done();
      }.bind(this));
    },

    askForNgModuleName: function () {
      var done = this.async();

      var prompts = [{
        name: 'moduleName',
        message: 'What\'s the ngModule name of your component?',
        default: this.generatorName
      }];

      this.prompt(prompts, function (props) {
        this.ngModuleName = 'sanji.' + props.moduleName;
        this.windowName = _.capitalize(props.moduleName.toLowerCase());
        this.constantModuleName = props.moduleName.toUpperCase();
        this.libraryName = 'sj' + _.capitalize(props.moduleName.toLowerCase());
        this.serviceClassName = _.capitalize(props.moduleName.toLowerCase()) + 'Service';
        this.serviceName = props.moduleName.toLowerCase() + 'Service';
        this.containerControllerClassName = _.capitalize(props.moduleName.toLowerCase())+ 'ContainerController';
        this.controllerClassName = _.capitalize(props.moduleName.toLowerCase())+ 'Controller';
        this.containerDirectiveClassName = _.capitalize(props.moduleName.toLowerCase()) + 'ContainerDirective';
        this.containerDirectiveName = 'sanji' + _.capitalize(props.moduleName.toLowerCase()) + 'Container';
        this.directiveClassName = _.capitalize(props.moduleName.toLowerCase()) + 'Directive';
        this.directiveName = 'sanji' + _.capitalize(props.moduleName.toLowerCase());
        this.directiveTplName = 'sanji-' + props.moduleName.toLowerCase();
        done();
      }.bind(this));
    },

    askForResource: function () {
      var done = this.async();

      var prompts = [{
        type: 'confirm',
        name: 'isCollection',
        message: 'API resource is collection?',
        default: true
      }];

      this.prompt(prompts, function (props) {
        this.isCollection = props.isCollection;
        done();
      }.bind(this));
    },

    askForBasePath: function () {
      var done = this.async();

      var prompts = [{
        name: 'basePath',
        message: 'What\'s your api base path?',
        default: '/api/v1'
      }];

      this.prompt(prompts, function (props) {
        this.apiBasePath = props.basePath;
        done();
      }.bind(this));
    }
  },

  configuring: {
    enforceFolderName: function () {
      if (this.appname !== _.last(this.destinationRoot().split(path.sep))) {
        this.destinationRoot(this.appname);
      }

      this.config.save();
    },

    userInfo: function () {
      var done = this.async();

      githubUserInfo(this.githubUser, function (res) {
        this.realname = res.name;
        this.email = res.email;
        this.githubUrl = res.html_url;
        done();
      }.bind(this), this.log);
    }

  },

  writing: {
    projectfiles: function () {
      this.template('_package.json', 'package.json');
      this.template('_travis.yml', '.travis.yml');
      this.template('editorconfig', '.editorconfig');
      this.template('eslintrc', '.eslintrc');
      this.template('README.md');
      this.template('index.js');
      this.template('webpack.config.js');
      this.template('webpack.build.js');
      this.template('webpack.dev.js');
      this.template('webpack.test.js');
      this.template('karma.conf.js');
    },

    gitfiles: function () {
      this.copy('gitattributes', '.gitattributes');
      this.copy('gitignore', '.gitignore');
    },

    app: function () {
      this.template('app/index.html');
      this.template('app/app.js');
      this.template('app/app.test.js');
      this.template('app/app.scss');
    },

    component: function() {
      this.template('app/component/component.scss');
      this.template('app/component/component.resource.json');
      this.template('app/component/component.i18n.js');
      this.template('app/component/lang/en.json');
      this.template('app/component/lang/zh-tw.json');

      this.fs.copyTpl(
        this.templatePath('app/component/index.js'),
        this.destinationPath(this.generatorsPrefix, 'app/component/index.js'),
        {
          ngModuleName: this.ngModuleName,
          containerControllerClassName: this.containerControllerClassName,
          controllerClassName: this.controllerClassName,
          containerDirectiveClassName: this.containerDirectiveClassName,
          containerDirectiveName: this.containerDirectiveName,
          directiveClassName: this.directiveClassName,
          directiveName: this.directiveName,
          serviceClassName: this.serviceClassName,
          serviceName: this.serviceName
        }
      );

      this.fs.copyTpl(
        this.templatePath('app/component/component-edit.tpl.html'),
        this.destinationPath(this.generatorsPrefix, 'app/component/component-edit.tpl.html'),
        {
          appname: this.appname,
          constantModuleName: this.constantModuleName,
          directiveTplName: this.directiveTplName,
          isCollection: this.isCollection
        }
      );

      this.fs.copyTpl(
        this.templatePath('app/component/component-container.controller.js'),
        this.destinationPath(this.generatorsPrefix, 'app/component/component-container.controller.js'),
        {
          containerControllerClassName: this.containerControllerClassName,
          serviceName: this.serviceName,
          appname: this.appname
        }
      );

      this.fs.copyTpl(
        this.templatePath('app/component/component.controller.js'),
        this.destinationPath(this.generatorsPrefix, 'app/component/component.controller.js'),
        {
          controllerClassName: this.controllerClassName
        }
      );

      this.fs.copyTpl(
        this.templatePath('app/component/component-container.directive.js'),
        this.destinationPath(this.generatorsPrefix, 'app/component/component-container.directive.js'),
        {
          containerControllerClassName: this.containerControllerClassName,
          containerDirectiveClassName: this.containerDirectiveClassName,
          directiveTplName: this.directiveTplName
        }
      );

      this.fs.copyTpl(
        this.templatePath('app/component/component.directive.js'),
        this.destinationPath(this.generatorsPrefix, 'app/component/component.directive.js'),
        {
          directiveTplName: this.directiveTplName,
          controllerClassName: this.controllerClassName,
          directiveClassName: this.directiveClassName,
          directiveName: this.directiveName,
          isCollection: this.isCollection
        }
      );

      this.fs.copyTpl(
        this.templatePath('app/component/component.service.js'),
        this.destinationPath(this.generatorsPrefix, 'app/component/component.service.js'),
        {
          serviceClassName: this.serviceClassName,
          serviceName: this.serviceName
        }
      );
    },

    server: function () {
      this.fs.copyTpl(
        this.templatePath('server/dev-server.js'),
        this.destinationPath(this.generatorsPrefix, 'server/dev-server.js'),
        {
          superb: superb(),
          generatorName: _s.classify(this.generatorName)
        }
      );
    }
  },

  install: function () {
    this.spawnCommand('git', ['init']);
    this.installDependencies({ bower: false });
  }
});
