const $inject = ['$log', '$scope'];
class <%= controllerClassName %> {
  constructor(...injects) {
    <%= controllerClassName %>.$inject.forEach((item, index) => this[item] = injects[index]);
    let sanjiWindowMgr = this.$scope.sanjiWindowMgr;
    this.ethernet = {
      ip: '192.168.31.204',
      netmask: '255.255.255.0',
      gateway: '192.168.31.254'
    };
    sanjiWindowMgr.goToInfoState();
  }
}
<%= controllerClassName %>.$inject = $inject;
export default <%= controllerClassName %>;
