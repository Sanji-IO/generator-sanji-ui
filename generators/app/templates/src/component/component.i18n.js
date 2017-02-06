import EN from './lang/en.json';
import ZH_TW from './lang/zh-tw.json';

export default $translateProvider => {
  'ngInject';
  $translateProvider.translations('en', EN);
  $translateProvider.translations('zh-tw', ZH_TW);
};
