const $inject = ['$scope', 'sanjiWindowService', '<%= serviceName %>'];
const WINDOW_ID = '<%= appname %>';
class <%= containerControllerClassName %> {
  constructor(...injects) {
    <%= containerControllerClassName %>.$inject.forEach((item, index) => this[item] = injects[index]);
  }

  $onInit() {
    this.sanjiWindowMgr = this.sanjiWindowService.get(WINDOW_ID);
    this.$scope.$on('sj:window:refresh', this.onRefresh.bind(this));
    this.sanjiWindowMgr.promise = this.<%= serviceName %>.get().then(result => this.data = result);
  }

  onRefresh(event, args) {
    if (args.id === WINDOW_ID) {
      this.$onInit();
    }
  }

  onSave(data) {
    this.sanjiWindowMgr.promise = this.<%= serviceName %>.update(data);
  }
}
<%= containerControllerClassName %>.$inject = $inject;
export default <%= containerControllerClassName %>;
