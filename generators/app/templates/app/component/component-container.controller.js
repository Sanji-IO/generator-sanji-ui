const $inject = ['$scope', 'sanjiWindowService', '<%= serviceName %>'];
const WINDOW_ID = '<%= appname %>';
class <%= containerControllerClassName %> {
  constructor(...injects) {
    <%= containerControllerClassName %>.$inject.forEach((item, index) => this[item] = injects[index]);

    this.sanjiWindowMgr = this.sanjiWindowService.get(WINDOW_ID);
    this.data = this.<%= serviceName %>.data;

    this.activate();

    this.$scope.$on('sj:window:refresh', this.onRefresh.bind(this))
  }

  activate() {
    this.sanjiWindowMgr.promise = this.<%= serviceName %>.get().then(() => {
      this.data = this.<%= serviceName %>.data;
    });
  }

  onRefresh(event, args) {
    if (args.id === WINDOW_ID) {
      this.activate();
    }
  }

  onSave(data) {
    this.sanjiWindowMgr.promise = this.<%= serviceName %>.update(data);
  }
}
<%= containerControllerClassName %>.$inject = $inject;
export default <%= containerControllerClassName %>;
