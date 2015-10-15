import 'angular-material.css';
import 'toastr.scss';
import './app.scss';
import 'angular';
import component from './component';

let app = angular.module('webapp', [component]);
app.config(restProvider => {
  restProvider.configure({basePath: 'http://private-d8e84-sanjigeneric.apiary-mock.com'});
});
