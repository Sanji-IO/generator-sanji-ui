const injectMap = new WeakMap();
const $inject = [];
class <%= containerDirectiveClassName %> {
  constructor(injects) {
    <%= containerDirectiveClassName %>.directiveFactory.$inject.forEach((item, index) => {
      <%= containerDirectiveClassName %>[item] = injects[index];
      injectMap.set(<%= containerDirectiveClassName %>[item], injects[index]);
    });
    this.restrict = 'EA';
    this.controller = '<%= containerControllerClassName %>';
    this.controllerAs = 'vm';
    this.scope = {};
    this.bindToController = true;
    this.template = `<<%= appname %> data="vm.data"></<%= appname %>>`;
  }

  static directiveFactory(...injects) {
    <%= containerDirectiveClassName %>.instance = new <%= containerDirectiveClassName %>(injects);
    return <%= containerDirectiveClassName %>.instance;
  }
}
<%= containerDirectiveClassName %>.directiveFactory.$inject = $inject;
export default <%= containerDirectiveClassName %>;
