const injectMap = new WeakMap();
const $inject = [];
class <%= directiveClassName %> {
  constructor(injects) {
    <%= directiveClassName %>.directiveFactory.$inject.forEach((item, index) => {
      <%= directiveClassName %>[item] = injects[index];
      injectMap.set(<%= directiveClassName %>[item], injects[index]);
    });
    this.templateUrl = '<%= appname %>-main.tpl.html'
    this.restrict = 'EA';
    this.controller = '<%= controllerClassName %>';
    this.controllerAs = 'vm';
    this.bindToController = true;
    this.scope = {
      data: '='
    };
  }

  static directiveFactory(...injects) {
    <%= directiveClassName %>.instance = new <%= directiveClassName %>(injects);
    return <%= directiveClassName %>.instance;
  }
}
<%= directiveClassName %>.directiveFactory.$inject = $inject;
export default <%= directiveClassName %>;
