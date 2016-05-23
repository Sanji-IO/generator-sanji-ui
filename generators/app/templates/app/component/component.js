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
  controller: '<%= controllerClassName %>',
  controllerAs: 'vm'
};
export default <%= componentClassName %> ;
