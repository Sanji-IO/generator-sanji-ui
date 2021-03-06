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
var uuid = require('uuid');
var optionOrPrompt = require('yeoman-option-or-prompt');

var proxy =
  process.env.http_proxy || process.env.HTTP_PROXY || process.env.https_proxy || process.env.HTTPS_PROXY || null;

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

var extractGeneratorName = function(appname) {
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

var githubUserInfo = function(name, cb, log) {
  github.user.getFrom(
    {
      user: name
    },
    function(err, res) {
      if (err) {
        log.error("Cannot fetch your github profile. Make sure you've typed it correctly.");
        res = emptyGithubRes;
      }

      cb(JSON.parse(JSON.stringify(res)));
    }
  );
};

module.exports = generators.Base.extend({
  _optionOrPrompt: optionOrPrompt,
  constructor: function() {
    generators.Base.apply(this, arguments);

    this.option('flat', {
      type: Boolean,
      required: true,
      defaults: true,
      desc: 'When specified, generators will be created at the top level of the project.'
    });
  },

  initializing: function() {
    this.pkg = require('../../package.json');
    this.currentYear = new Date().getFullYear();
    this.config.set('structure', this.options.flat ? 'flat' : 'nested');
    this.generatorsPrefix = this.options.flat ? '' : 'generators/';
    this.appGeneratorDir = this.options.flat ? 'app' : 'generators';
  },

  prompting: {
    askFor: function() {
      var done = this.async();

      this.log(yosay('Create your own ' + chalk.red('Sanji UI') + ' with superpowers!'));

      var prompts = [
        {
          name: 'realname',
          message: 'Would you mind telling me your username?',
          default: 'someuser'
        }
      ];

      this._optionOrPrompt(
        prompts,
        function(props) {
          this.realname = props.realname;
          done();
        }.bind(this)
      );
    },

    askForEmail: function() {
      var done = this.async();

      var prompts = [
        {
          name: 'email',
          message: 'Would you mind telling me your email?',
          default: 'hello@world.io'
        }
      ];

      this._optionOrPrompt(
        prompts,
        function(props) {
          this.email = props.email;
          done();
        }.bind(this)
      );
    },

    askForUuid: function() {
      var done = this.async();

      var prompts = [
        {
          name: 'uuid',
          message: 'Would you mind telling me UUID(e.g. fda9c0c5-dd93-4eff-b94f-326d47735b82) you have created before?'
        }
      ];

      this._optionOrPrompt(
        prompts,
        function(props) {
          this.uuid = props.uuid;
          done();
        }.bind(this)
      );
    },

    askForGeneratorName: function() {
      var done = this.async();
      var generatorName = extractGeneratorName(this.appname);

      var prompts = [
        {
          name: 'generatorName',
          message: 'What\'s the base name of your project? Prefix "sanji-" is already exist.',
          default: generatorName
        }
      ];

      this._optionOrPrompt(
        prompts,
        function(props) {
          if (props.askNameAgain) {
            return this.prompting.askForGeneratorName.call(this);
          }

          this.generatorName = props.generatorName;
          this.appname = _s.slugify('sanji-' + this.generatorName);

          done();
        }.bind(this)
      );
    },

    askForNgModuleName: function() {
      var done = this.async();

      var prompts = [
        {
          name: 'moduleName',
          message: "What's the ngModule name of your component?",
          default: this.generatorName
        }
      ];

      this._optionOrPrompt(
        prompts,
        function(props) {
          this.moduleName = props.moduleName.toLowerCase();
          this.ngModuleName = 'sanji.' + props.moduleName;
          this.windowName = _.capitalize(props.moduleName.toLowerCase());
          this.constantModuleName = props.moduleName.toUpperCase();
          this.libraryName = 'sj' + _.capitalize(props.moduleName.toLowerCase());
          this.serviceClassName = _.capitalize(props.moduleName.toLowerCase()) + 'Service';
          this.serviceName = props.moduleName.toLowerCase() + 'Service';
          this.actionClassName = _.capitalize(props.moduleName.toLowerCase()) + 'Action';
          this.actionName = props.moduleName.toLowerCase() + 'Action';
          this.containerControllerClassName = _.capitalize(props.moduleName.toLowerCase()) + 'ContainerController';
          this.controllerClassName = _.capitalize(props.moduleName.toLowerCase()) + 'Controller';
          this.containerComponentClassName = _.capitalize(props.moduleName.toLowerCase()) + 'ContainerComponent';
          this.containerComponentName = 'sanji' + _.capitalize(props.moduleName.toLowerCase()) + 'Container';
          this.windowComponentClassName = _.capitalize(props.moduleName.toLowerCase()) + 'WindowComponent';
          this.windowComponentName = 'sanji' + _.capitalize(props.moduleName.toLowerCase()) + 'Window';
          this.componentClassName = _.capitalize(props.moduleName.toLowerCase()) + 'Component';
          this.componentName = 'sanji' + _.capitalize(props.moduleName.toLowerCase());
          this.componentTplName = 'sanji-' + props.moduleName.toLowerCase();
          done();
        }.bind(this)
      );
    },

    askForVersion: function() {
      var done = this.async();

      var prompts = [
        {
          name: 'version',
          message: 'What is your semver version?',
          default: '1.0.0'
        }
      ];

      this._optionOrPrompt(
        prompts,
        function(props) {
          this.version = props.version;
          done();
        }.bind(this)
      );
    },

    askForResource: function() {
      var done = this.async();

      var prompts = [
        {
          type: 'confirm',
          name: 'isCollection',
          message: 'API resource is collection?',
          default: true
        }
      ];

      this._optionOrPrompt(
        prompts,
        function(props) {
          this.isCollection = props.isCollection;
          done();
        }.bind(this)
      );
    },

    askForBasePath: function() {
      var done = this.async();

      var prompts = [
        {
          name: 'basePath',
          message: "What's your api base path?",
          default: '/api/v1'
        }
      ];

      this._optionOrPrompt(
        prompts,
        function(props) {
          this.apiBasePath = props.basePath;
          done();
        }.bind(this)
      );
    },

    askForEndpoint: function() {
      var done = this.async();

      var prompts = [
        {
          name: 'endpoint',
          message: "What's your endpoint?"
        }
      ];

      this._optionOrPrompt(
        prompts,
        function(props) {
          this.endpoint = props.endpoint;
          done();
        }.bind(this)
      );
    },

    askForDescription: function() {
      var done = this.async();

      var prompts = [
        {
          name: 'description',
          message: 'Description for this compoent'
        }
      ];

      this._optionOrPrompt(
        prompts,
        function(props) {
          this.description = props.description;
          done();
        }.bind(this)
      );
    }
  },

  configuring: {
    enforceFolderName: function() {
      if (this.appname !== _.last(this.destinationRoot().split(path.sep))) {
        this.destinationRoot(this.appname);
      }

      this.config.save();
    },

    uuid: function() {
      this.uuid = this.uuid || uuid.v4();
    }
  },

  writing: {
    projectfiles: function() {
      this.template('_package.json', 'package.json');
      this.template('editorconfig', '.editorconfig');
      this.template('vcmrc', '.vcmrc');
      this.template('babelrc', '.babelrc');
      this.template('eslintrc', '.eslintrc');
      this.template('postcss.config.js');
      this.template('README.md');
      this.template('index.js');
      this.template('webpack.config.js');
      this.template('webpack.build.js');
      this.template('webpack.dev.js');
      this.template('webpack.test.js');
      this.template('Makefile');
    },

    debfiles: function() {
      this.template('build-deb/Makefile');
      this.template('build-deb/debian/changelog');
      this.template('build-deb/debian/control');
      this.template('build-deb/debian/postinst');
      this.template('build-deb/debian/postrm');
      this.copy('build-deb/debian/copyright');
      this.copy('build-deb/debian/compat');
      this.copy('build-deb/debian/rules');
      this.copy('build-deb/debian/source/format');
    },

    npmfiles: function() {
      this.copy('npmignore', '.npmignore');
    },

    gitfiles: function() {
      this.copy('gitattributes', '.gitattributes');
      this.template('gitignore', '.gitignore');
    },

    app: function() {
      this.template('src/index.html');
      this.template('src/app.js');
      this.template('src/app.test.js');
      this.template('src/app.scss');
    },

    component: function() {
      this.template('src/component/component.resource.json');
      this.template('src/component/component.route.js');
      this.template('src/component/component.i18n.js');
      this.template('src/component/lang/en.json');
      this.template('src/component/lang/zh-tw.json');

      this.fs.copyTpl(
        this.templatePath('src/component/index.js'),
        this.destinationPath(this.generatorsPrefix, 'src/component/index.js'),
        {
          libraryName: this.libraryName,
          ngModuleName: this.ngModuleName,
          containerComponentClassName: this.containerComponentClassName,
          containerComponentName: this.containerComponentName,
          windowComponentClassName: this.windowComponentClassName,
          windowComponentName: this.windowComponentName,
          componentClassName: this.componentClassName,
          componentName: this.componentName,
          serviceClassName: this.serviceClassName,
          serviceName: this.serviceName,
          actionClassName: this.actionClassName,
          actionName: this.actionName,
          moduleName: this.moduleName,
          constantModuleName: this.constantModuleName
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/component/container.controller.js'),
        this.destinationPath(this.generatorsPrefix, 'src/component/container.controller.js'),
        {
          containerControllerClassName: this.containerControllerClassName,
          serviceName: this.serviceName,
          appname: this.appname,
          actionName: this.actionName,
          windowName: this.windowName,
          moduleName: this.moduleName
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/component/component.controller.js'),
        this.destinationPath(this.generatorsPrefix, 'src/component/component.controller.js'),
        {
          controllerClassName: this.controllerClassName
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/component/window.component.js'),
        this.destinationPath(this.generatorsPrefix, 'src/component/window.component.js'),
        {
          windowComponentClassName: this.windowComponentClassName,
          componentTplName: this.componentTplName,
          constantModuleName: this.constantModuleName,
          appname: this.appname
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/component/container.component.js'),
        this.destinationPath(this.generatorsPrefix, 'src/component/container.component.js'),
        {
          containerControllerClassName: this.containerControllerClassName,
          containerComponentClassName: this.containerComponentClassName,
          componentTplName: this.componentTplName
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/component/container.component.spec.js'),
        this.destinationPath(this.generatorsPrefix, 'src/component/container.component.spec.js'),
        {
          libraryName: this.libraryName,
          containerComponentName: this.containerComponentName,
          serviceName: this.serviceName
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/component/component.js'),
        this.destinationPath(this.generatorsPrefix, 'src/component/component.js'),
        {
          controllerClassName: this.controllerClassName,
          componentClassName: this.componentClassName,
          isCollection: this.isCollection,
          appname: this.appname,
          constantModuleName: this.constantModuleName,
          componentTplName: this.componentTplName,
          isCollection: this.isCollection
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/component/component.state.js'),
        this.destinationPath(this.generatorsPrefix, 'src/component/component.state.js'),
        {
          constantModuleName: this.constantModuleName,
          actionClassName: this.actionClassName,
          serviceName: this.serviceName,
          windowName: this.windowName,
          moduleName: this.moduleName,
          isCollection: this.isCollection
        }
      );

      this.fs.copyTpl(
        this.templatePath('src/component/component.service.js'),
        this.destinationPath(this.generatorsPrefix, 'src/component/component.service.js'),
        {
          serviceClassName: this.serviceClassName,
          serviceName: this.serviceName,
          apiBasePath: this.apiBasePath,
          constantModuleName: this.constantModuleName,
          isCollection: this.isCollection
        }
      );
    },

    server: function() {
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

  install: function() {
    this.installDependencies({ skipInstall: this.options['skip-install'] || false, bower: false });
  }
});
