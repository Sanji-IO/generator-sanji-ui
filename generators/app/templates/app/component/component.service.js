import _ from 'lodash';

import resource from './component.resource.json';

const $inject = ['$q', 'rest', 'exception', 'pathToRegexp', '$filter', 'logger'];
class <%= serviceClassName %> {
  constructor(...injects) {
    <%= serviceClassName %>.$inject.forEach((item, index) => this[item] = injects[index]);
    this.message = {
      read: {
        error: '[<%= serviceClassName %>] Get data error.'
      },
      update: {
        success: '<%= constantModuleName %>_FORM_SAVE_SUCCESS',
        error: '[<%= serviceClassName %>] Update data error.'
      }
    };
    this.restConfig = {
      basePath: (__DEV__) ? __BASE_PATH__ : undefined,
    };
    if (__DEV__) {
      this.restConfig.headers = {
        'mx-api-token': __API_TOKEN__
      };
    }
    switch(resource.get.type) {
    case 'collection':
      this.data = [];
      break;
    case 'model':
      this.data = {};
      break;
    default:
      this.data = [];
    }
  }

  _transform(data) {
    switch(resource.get.type) {
    case 'collection':
      return _.map(data, (item, index) => {
        return {
          title: (resource.get.titlePrefix || 'tab') + index,
          content: item,
          formOptions: {},
          fields: resource.fields
        };
      });
    case 'model':
      return {
        content: data,
        formOptions: {},
        fields: resource.fields
      };
    default:
      return _.map(data, (item, index) => {
        return {
          title: (resource.get.titlePrefix || 'tab') + index,
          content: item,
          formOptions: {},
          fields: resource.fields
        };
      });
    }
  }

  get() {
    const toPath = this.pathToRegexp.compile(resource.get.url);
    return this.rest.get(toPath(), this.restConfig)
    .then(res => this.data = this._transform(res.data))
    .catch(err => {
      this.exception.catcher(this.$filter('translate')(this.message.read.error))(err);
      return this.$q.reject();
    });
  }

  update(data) {
    const toPath = this.pathToRegexp.compile(resource.put.url);
    const path = (undefined !== data.content.id) ? toPath({id: data.content.id}) : toPath();
    return this.rest.put(path, data.content, data.formOptions.files, this.restConfig)
    .then(res => {
      this.logger.success(this.$filter('translate')(this.message.update.success), res.data);
      return res.data;
    })
    .catch(err => {
      this.exception.catcher(this.$filter('translate')(this.message.update.error))(err);
      return this.$q.reject();
    });
  }
}
<%= serviceClassName %>.$inject = $inject;
export default <%= serviceClassName %>;
