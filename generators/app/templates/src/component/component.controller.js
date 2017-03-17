const $inject = [];
class <%= controllerClassName %> {
  constructor(...injects) {
    <%= controllerClassName %>.$inject.forEach((item, index) => this[item] = injects[index]);
  }

  isAuthorized(roles) {
    return this.onAuthorized({
      $event: {
        roles
      }
    });
  }

  save(data) {
    this.submitCallback({
      $event: {data: data}
    });
  }
}
<%= controllerClassName %>.$inject = $inject;
export default <%= controllerClassName %>;
