import 'angular-material.css';
import 'toastr.scss';
import './app.scss';
import 'angular';
import component from './component';

let app = angular.module('webapp', [component]);
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
