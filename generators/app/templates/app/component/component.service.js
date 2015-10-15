const $inject = ['$q', 'rest', 'exception'];
class <%= serviceClassName %> {
  constructor(...injects) {
    <%= serviceClassName %>.$inject.forEach((item, index) => this[item] = injects[index]);
    this.model = {};
  }

  get() {
    return this.$http.get('/network/ethernets')
    .then(res => {
      this.model = res.data[0];
    })
    .catch(err => {
      this.exception.catcher('[<%= serviceClassName %>] Get data error.')(err);
      return this.$q.reject();
    });
  }
}
<%= serviceClassName %>.$inject = $inject;
export default <%= serviceClassName %>;
