import route from './component.route';
import i18nConfig from './component.i18n';
import <%= serviceClassName %> from './component.service';
import <%= containerControllerClassName %> from './container.controller';
import <%= controllerClassName %> from './component.controller';
import <%= containerComponentClassName %> from './container.component';
import <%= componentClassName %> from './component';
import <%= windowComponentClassName %> from './window.component';

let app = angular.module('<%= ngModuleName %>', ['sanji.core']);
app.config(i18nConfig);
app.service('<%= serviceName %>', <%= serviceClassName %>);
app.controller('<%= containerControllerClassName %>', <%= containerControllerClassName %>);
app.controller('<%= controllerClassName %>', <%= controllerClassName %>);
app.component('<%= containerComponentName %>', <%= containerComponentClassName %>);
app.component('<%= componentName %>', <%= componentClassName%>);
app.component('<%= windowComponentName %>', <%= windowComponentClassName %>);
app.run(route);
export default app = app.name;
