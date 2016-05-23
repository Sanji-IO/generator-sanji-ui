const <%= containerComponentClassName %> = {
  template: `<<%= componentTplName %> data="vm.data" on-submit="vm.onSave(data)"></<%= componentTplName %>>`,
  controller: '<%= containerControllerClassName %>',
  controllerAs: 'vm'
};
export default <%= containerComponentClassName %>;
