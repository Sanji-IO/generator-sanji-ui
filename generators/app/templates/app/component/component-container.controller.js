const $inject = ['sanjiWindowService', '<%= serviceName %>'];
class <%= containerControllerClassName %> {
  constructor(...injects) {
    <%= containerControllerClassName %>.$inject.forEach((item, index) => this[item] = injects[index]);

    const WINDOW_ID = '<%= serviceName %>';
    const EDIT_STATE = 'sanji-edit';
    let <%= serviceName %> = this.<%= serviceName %>;
    let sanjiWindowMgr = this.sanjiWindowService.get(WINDOW_ID);

    this.data = <%= serviceName %>.collection;

    this.<%= serviceName %>.get().then(() => {
      this.data = <%= serviceName %>.collection;
      sanjiWindowMgr.navigateTo(EDIT_STATE);
    });
  }
}
<%= containerControllerClassName %>.$inject = $inject;
export default <%= containerControllerClassName %>;
