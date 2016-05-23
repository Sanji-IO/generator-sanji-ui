import resource from './component.resource.json';

const $inject = ['$q', 'rest', 'exception', '_', 'pathToRegexp', '$filter', 'logger'];
class <%= serviceClassName %> {
  constructor(...injects) {
    <%= serviceClassName %>.$inject.forEach((item, index) => this[item] = injects[index]);
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
      return this._.map(data, (item, index) => {
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
      return this._.map(data, (item, index) => {
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
    let toPath = this.pathToRegexp.compile(resource.get.url);
    return this.rest.get(toPath(), (__DEV__) ? {basePath: '<%= apiBasePath %>'} : undefined)
    .then(res => {
      return this.data = this._transform(res.data);
    })
    .catch(err => {
      this.exception.catcher('[<%= serviceClassName %>] Get data error.')(err);
      return this.$q.reject();
    });
  }

  update(data) {
    let toPath = this.pathToRegexp.compile(resource.put.url);
    let path = (undefined !== data.content.id) ? toPath({id: data.content.id}) : toPath();
    return this.rest.put(path, data.content, data.formOptions.files, (__DEV__) ? {basePath: '<%= apiBasePath %>' } : undefined)
    .then(res => {
      this.logger.success(this.$filter('translate')('<%= constantModuleName %>_FORM_SAVE_SUCCESS'), res.data);
      return res.data;
    })
    .catch(err => {
      this.exception.catcher('[<%= serviceClassName %>] Update data error.')(err);
      return this.$q.reject();
    });
  }
}
<%= serviceClassName %>.$inject = $inject;
export default <%= serviceClassName %>;
