const injectMap = new WeakMap();
const $inject = ['$log'];
class <%= directiveClassName %> {
  constructor(injects) {
    <%= directiveClassName %>.directiveFactory.$inject.forEach((item, index) => {
      <%= directiveClassName %>[item] = injects[index];
      injectMap.set(<%= directiveClassName %>[item], injects[index]);
    });
    this.template = `<sanji-window title="Ethernet"
                      content-url="component-main.tpl.html">
                      </sanji-window>`;
    this.restrict = 'EA';
  }

  static directiveFactory(...injects) {
    <%= directiveClassName %>.instance = new <%= directiveClassName %>(injects);
    return <%= directiveClassName %>.instance;
  }
}
<%= directiveClassName %>.directiveFactory.$inject = $inject;
export default <%= directiveClassName %>;
