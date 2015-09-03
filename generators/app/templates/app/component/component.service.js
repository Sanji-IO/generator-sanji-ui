const $inject = ['$log', '$http'];
class <%= serviceClassName %> {
  constructor(...injects) {
    <%= serviceClassName %>.$inject.forEach((item, index) => this[item] = injects[index]);
    this.collection = null;
  }

  get() {
    return this.$http.get('http://private-d8e84-sanjigeneric.apiary-mock.com/network/ethernets')
      .then((res) => {
        this.collection = angular.copy(res.data);
        return this.collection;
      });
  }
}
<%= serviceClassName %>.$inject = $inject;
export default <%= serviceClassName %>;
