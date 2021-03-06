import 'angular-material.css';
import 'angular-material-icons.css';
import 'angular-sanji-window.css';
import 'toastr.css';
import './app.scss';
import angular from 'angular';
import { sjCore } from 'sanji-core-ui';
import { <%= libraryName %>, <%= moduleName %> } from './component';

const app = angular.module('webapp', [sjCore, <%= libraryName %>]);
class AppController {
  constructor($translate, LANG_KEYS) {
    this.$translate = $translate;
    this.currentLang = $translate.use();
    this.langs = LANG_KEYS;
  }

  changeLang(lang) {
    this.$translate.use(lang);
  }
}
app.controller('AppController', AppController);
app.config(reduxHelperProvider => {
  reduxHelperProvider.configure({<%= moduleName %>}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
});
app.run(session => {
  session.create('token', 'test');
  session.setUserData({
    role: 'admin'
  });
});

angular.element(document).ready(() => {
  angular.bootstrap(document.body, ['webapp']);
});
