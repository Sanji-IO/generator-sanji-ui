const $inject = ['$q', 'rest', 'exception', '_', 'pathToRegexp'];
const config = require('./component.resource.json');
class <%= serviceClassName %> {
  constructor(...injects) {
    <%= serviceClassName %>.$inject.forEach((item, index) => this[item] = injects[index]);
    switch(config.get.type) {
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
    switch(config.get.type) {
      case 'collection':
        return this._.map(data, (item, index) => {
          return {
            title: (config.get.titlePrefix || 'tab') + index,
            content: item,
            formOptions: {},
            fields: config.fields
          };
        });
      case 'model':
        return {
          content: data,
          formOptions: {},
          fields: config.fields
        };
      default:
        return this._.map(data, (item, index) => {
          return {
            title: (config.get.titlePrefix || 'tab') + index,
            content: item,
            formOptions: {},
            fields: config.fields
          };
        });
    }
  }

  get() {
    let toPath = this.pathToRegexp.compile(config.get.url);
    return this.rest.get(toPath())
    .then(res => {
      this.data = this._transform(res.data);
    })
    .catch(err => {
      this.exception.catcher('[<%= serviceClassName %>] Get data error.')(err);
      return this.$q.reject();
    });
  }

  update(data) {
    let toPath = this.pathToRegexp.compile(config.put.url);
    let path = (undefined !== data.content.id) ? toPath({id: data.content.id}) : toPath();
    return this.rest.put(path, data.content, data.formOptions.files)
    .catch(err => {
      this.exception.catcher('[<%= serviceClassName %>] Update data error.')(err);
      return this.$q.reject();
    });
  }
}
<%= serviceClassName %>.$inject = $inject;
export default <%= serviceClassName %>;
