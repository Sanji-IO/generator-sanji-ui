import route from './component.route';
import i18nConfig from './component.i18n';
import <%= serviceClassName %> from './component.service';
import <%= containerComponentClassName %> from './container.component';
import <%= componentClassName %> from './component';
import <%= windowComponentClassName %> from './window.component';

const <%= libraryName %> = angular.module('<%= ngModuleName %>', ['sanji.core'])
  .config(i18nConfig)
  .service('<%= serviceName %>', <%= serviceClassName %>)
  .component('<%= containerComponentName %>', <%= containerComponentClassName %>)
  .component('<%= componentName %>', <%= componentClassName%>)
  .component('<%= windowComponentName %>', <%= windowComponentClassName %>)
  .run(route)
  .name;
export { <%= libraryName %> };
