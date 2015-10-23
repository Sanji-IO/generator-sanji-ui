const $inject = ['sanjiWindowService', '<%= serviceName %>'];
class <%= containerControllerClassName %> {
  constructor(...injects) {
    <%= containerControllerClassName %>.$inject.forEach((item, index) => this[item] = injects[index]);

    const WINDOW_ID = '<%= appname %>';
    const EDIT_STATE = 'sanji-edit';
    let <%= serviceName %> = this.<%= serviceName %>;
    let sanjiWindowMgr = this.sanjiWindowService.get(WINDOW_ID);

    this.data = <%= serviceName %>.data;

    this.<%= serviceName %>.get().then(() => {
      this.data = <%= serviceName %>.data;
      sanjiWindowMgr.navigateTo(EDIT_STATE);
    });
  }

  onSave(data) {
    this.<%= serviceName %>.update(data);
  }
}
<%= containerControllerClassName %>.$inject = $inject;
export default <%= containerControllerClassName %>;
