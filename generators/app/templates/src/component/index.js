import route from './component.route';
import i18nConfig from './component.i18n';
import { <%= actionClassName %>, <%= moduleName %>, GET_<%= constantModuleName %>, UPDATE_<%= constantModuleName %> } from './component.state';
import <%= serviceClassName %> from './component.service';
import <%= containerComponentClassName %> from './container.component';
import <%= componentClassName %> from './component';
import <%= windowComponentClassName %> from './window.component';

const <%= libraryName %> = angular.module('<%= ngModuleName %>', [])
  .config(i18nConfig)
  .factory('<%= actionName %>', <%= actionClassName %>)
  .service('<%= serviceName %>', <%= serviceClassName %>)
  .component('<%= containerComponentName %>', <%= containerComponentClassName %>)
  .component('<%= componentName %>', <%= componentClassName %>)
  .component('<%= windowComponentName %>', <%= windowComponentClassName %>)
  .run(reduxHelper => {
    'ngInject';
    reduxHelper.injectAsyncReducer('<%= moduleName %>', <%= moduleName %>);
  })
  .run(route)
  .name;
export { <%= libraryName %>, <%= actionClassName %>, <%= moduleName %>, GET_<%= constantModuleName %>, UPDATE_<%= constantModuleName %> };
