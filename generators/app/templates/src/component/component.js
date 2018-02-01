import <%= controllerClassName %> from './component.controller';

const <%= componentClassName %> = {
  bindings: {
    <% if (isCollection) { %>
    tabs: '<data',
    <% } else { %>
    data: '<',
    <% } %>
    submitCallback: '&onSubmit',
    onAuthorized: '&'
  },
  template: `
    <% if (isCollection) { %>
    <md-tabs md-dynamic-height md-border-bottom md-selected="$ctrl.selectedIndex">
      <md-tab ng-repeat="tab in $ctrl.tabs track by $index" label="{{::tab.title}}" aria-label="{{::tab.title}}">
        <form ng-if="$ctrl.selectedIndex === $index" ng-submit="$ctrl.save(tab)"
          role="form" layout="column" layout-padding novalidate>
            <formly-form
            model="tab.content" options="tab.formOptions" fields="tab.fields" form="tabform">
              <div layout layout-align="end center">
                <md-button type="submit" class="md-raised md-primary" aria-label="Submit"
                ng-disabled="tabform.$invalid || !$ctrl.isAuthorized(['root', 'admin'])">
                  <sapn translate="<%= constantModuleName %>_FORM_SAVE"></span>
                </md-button>
              </div>
            </formly-form>
        </form>
      </md-tab>
    </md-tabs>
    <% } else { %>
    <form ng-submit="$ctrl.save($ctrl.data)" role="form" layout="column" layout-padding novalidate>
      <formly-form
        model="$ctrl.data.content"
        fields="$ctrl.data.fields"
        options="$ctrl.data.formOptions"
        form="$ctrl.form">
        <div layout layout-align="end center">
          <md-button type="submit" class="md-raised md-primary" aria-label="Submit"
          ng-disabled="$ctrl.form.$invalid || !$ctrl.isAuthorized(['root', 'admin'])">
            <sapn translate="<%= constantModuleName %>_FORM_SAVE"></span>
          </md-button>
        </div>
      </formly-form>
    </form>
    <% } %>
  `,
  controller: <%= controllerClassName %>
};
export default <%= componentClassName %>;
