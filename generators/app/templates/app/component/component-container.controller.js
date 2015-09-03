const $inject = ['$log', '$scope', '<%= serviceName %>'];
class <%= containerControllerClassName %> {
  constructor(...injects) {
    <%= containerControllerClassName %>.$inject.forEach((item, index) => this[item] = injects[index]);

    let $log = this.$log;

    this.data =[];
    this.<%= serviceName %>.get().then((collection) => {
      this.data = collection;
      this.sanjiWindowMgr.goToInfoState();
    });
  }
}
<%= containerControllerClassName %>.$inject = $inject;
export default <%= containerControllerClassName %>;
