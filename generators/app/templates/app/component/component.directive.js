const injectMap = new WeakMap();
const $inject = [];
class <%= directiveClassName %> {
  constructor(injects) {
    <%= directiveClassName %>.directiveFactory.$inject.forEach((item, index) => {
      <%= directiveClassName %>[item] = injects[index];
      injectMap.set(<%= directiveClassName %>[item], injects[index]);
    });
    this.templateUrl = '<%= directiveTplName %>-edit.tpl.html'
    this.restrict = 'EA';
    this.controller = '<%= controllerClassName %>';
    this.controllerAs = 'vm';
    this.scope = {};
    this.bindToController = {
      <% if (isCollection) { %>
      tabs: '=data',
      <% } else { %>
      data: '=',
      <% } %>
      submitCallback: '&onSubmit'
    };
  }

  static directiveFactory(...injects) {
    <%= directiveClassName %>.instance = new <%= directiveClassName %>(injects);
    return <%= directiveClassName %>.instance;
  }
}
<%= directiveClassName %>.directiveFactory.$inject = $inject;
export default <%= directiveClassName %>;
