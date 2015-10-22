import 'angular-material.css';
import 'toastr.scss';
import './app.scss';
import 'angular';
import component from './component';

let app = angular.module('webapp', [component]);
app.config(restProvider => {
  restProvider.configure({basePath: 'http://private-d8e84-sanjigeneric.apiary-mock.com'});
});

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
