const $inject = ['$log'];
class <%= serviceClassName %> {
  constructor() {
    <%= serviceClassName %>.$inject.forEach((item, index) => this[item] = injects[index]);
  }
}
<%= serviceClassName %>.$inject = $inject;
export default <%= serviceClassName %>;
