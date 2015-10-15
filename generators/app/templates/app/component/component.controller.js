const $inject = [];
class <%= controllerClassName %> {
  constructor(...injects) {
    <%= controllerClassName %>.$inject.forEach((item, index) => this[item] = injects[index]);
  }
}
<%= controllerClassName %>.$inject = $inject;
export default <%= controllerClassName %>;
