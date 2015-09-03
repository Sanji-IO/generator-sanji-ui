const injectMap = new WeakMap();
const $inject = ['$log'];
class <%= containerDirectiveClassName %> {
  constructor(injects) {
    <%= containerDirectiveClassName %>.directiveFactory.$inject.forEach((item, index) => {
      <%= containerDirectiveClassName %>[item] = injects[index];
      injectMap.set(<%= containerDirectiveClassName %>[item], injects[index]);
    });
    this.restrict = 'EA';
    this.controller = '<%= containerControllerClassName %>';
    this.controllerAs = 'vm';
    this.scope = true;
    this.bindToController = {
      sanjiWindowMgr: '='
    };
    this.template = `<<%= appname %> data="vm.data" sanji-window-mgr="vm.sanjiWindowMgr"></<%= appname %>>`;
  }

  static directiveFactory(...injects) {
    <%= containerDirectiveClassName %>.instance = new <%= containerDirectiveClassName %>(injects);
    return <%= containerDirectiveClassName %>.instance;
  }
}
<%= containerDirectiveClassName %>.directiveFactory.$inject = $inject;
export default <%= containerDirectiveClassName %>;
