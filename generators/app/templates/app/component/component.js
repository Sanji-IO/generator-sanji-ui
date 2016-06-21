import <%= controllerClassName %> from './component.controller';

const <%= componentClassName %> = {
  bindings: {
    <% if (isCollection) { %>
    tabs: '<data',
    <% } else { %>
    data: '<',
    <% } %>
    submitCallback: '&onSubmit'
  },
  template: require('./component.tpl.html'),
  controller: <%= controllerClassName %>
};
export default <%= componentClassName %> ;
