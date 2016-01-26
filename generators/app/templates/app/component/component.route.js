import resource from './component.resource.json';

export default (routerHelper) => {
  routerHelper.configureStates(getStates());

  function getStates() {
    return [{
      state: resource.route.state,
      config: {
        url: resource.route.url,
        template: `<div layout="row" layout-padding layout-align="center center">
                    <div flex="33">
                      <<%= directiveTplName %>-window></<%= directiveTplName %>-window>
                    </div>
                  </div>`,
        authenticate: resource.authenticate,
        title: resource.title
      }
    }];
  }
}
