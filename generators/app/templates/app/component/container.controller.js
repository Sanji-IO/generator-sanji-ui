const $inject = ['$scope', '$ngRedux', 'sanjiWindowService', '<%= actionName %>'];
const WINDOW_ID = '<%= appname %>';
class <%= containerControllerClassName %> {
  constructor(...injects) {
    <%= containerControllerClassName %>.$inject.forEach((item, index) => this[item] = injects[index]);
  }

  $onInit() {
    this.sanjiWindowMgr = this.sanjiWindowService.get(WINDOW_ID);
    this.unhandler = this.$scope.$on('sj:window:refresh', this.onRefresh.bind(this));
    this.unsubscribe = this.$ngRedux.connect(this.mapStateToThis, this.<%= actionName %>)(this);
    this.sanjiWindowMgr.promise = this.get<%= windowName %>();
  }

  $onDestroy() {
    this.unsubscribe();
    this.unhandler();
  }

  mapStateToThis(state) {
    return {
      data: state.<%= moduleName %>
    };
  }

  onRefresh(event, args) {
    if (args.id === WINDOW_ID) {
      this.sanjiWindowMgr.promise = this.get<%= windowName %>({force: true});
    }
  }

  onSave(event) {
    this.sanjiWindowMgr.promise = this.update<%= windowName %>(event.data);
  }
}
<%= containerControllerClassName %>.$inject = $inject;
export default <%= containerControllerClassName %>;
