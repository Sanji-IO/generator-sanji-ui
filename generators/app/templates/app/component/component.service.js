const $inject = ['$q', 'rest', 'exception'];
class <%= serviceClassName %> {
  constructor(...injects) {
    <%= serviceClassName %>.$inject.forEach((item, index) => this[item] = injects[index]);
    this.model = {};
  }

  _transform(data) {
    return {
      content: data,
      formOptions: {},
      fields: require('./component.form.json')
    };
  }

  get() {
    return this.$http.get('/network/ethernets')
    .then(res => {
      this.model = this._transform(res.data[0]);
    })
    .catch(err => {
      this.exception.catcher('[<%= serviceClassName %>] Get data error.')(err);
      return this.$q.reject();
    });
  }

  update(data) {
    return this.rest.put('/network/ethernets/' + data.id, data)
    .catch(err => {
      this.exception.catcher('[EthernetService] Update data error.')(err);
      return this.$q.reject();
    });
  }
}
<%= serviceClassName %>.$inject = $inject;
export default <%= serviceClassName %>;
