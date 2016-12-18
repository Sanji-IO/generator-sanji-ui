import <%= containerControllerClassName %> from './container.controller';

const <%= containerComponentClassName %> = {
  template: `<<%= componentTplName %> data="$ctrl.data" on-submit="$ctrl.onSave(data)"></<%= componentTplName %>>`,
  controller: <%= containerControllerClassName %>
};
export default <%= containerComponentClassName %>;
