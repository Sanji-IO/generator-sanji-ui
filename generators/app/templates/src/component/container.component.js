import <%= containerControllerClassName %> from './container.controller';

const <%= containerComponentClassName %> = {
  template: `<<%= componentTplName %> data="$ctrl.data" on-submit="$ctrl.onSave($event)"></<%= componentTplName %>>`,
  controller: <%= containerControllerClassName %>
};
export default <%= containerComponentClassName %>;
