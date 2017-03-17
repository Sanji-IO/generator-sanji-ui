import <%= containerControllerClassName %> from './container.controller';

const <%= containerComponentClassName %> = {
  template: `<<%= componentTplName %> data="$ctrl.data" on-submit="$ctrl.onSave($event)"  on-authorized="$ctrl.onAuthorized($event)"></<%= componentTplName %>>`,
  controller: <%= containerControllerClassName %>
};
export default <%= containerComponentClassName %>;
