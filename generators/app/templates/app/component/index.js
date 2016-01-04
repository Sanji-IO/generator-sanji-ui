import './component.tpl.html';
import route from './component.route';
import i18nConfig from './component.i18n';
import <%= serviceClassName %> from './component.service';
import <%= containerControllerClassName %> from './component-container.controller';
import <%= controllerClassName %> from './component.controller';
import <%= containerDirectiveClassName %> from './component-container.directive';
import <%= directiveClassName %> from './component.directive';
import <%= windowDirectiveClassName %> from './component-window.directive';

let app = angular.module('<%= ngModuleName %>', ['sanji.core']);
app.constant('resource', require('./component.resource.json'));
app.config(i18nConfig);
app.service('<%= serviceName %>', <%= serviceClassName %>);
app.controller('<%= containerControllerClassName %>', <%= containerControllerClassName %>);
app.controller('<%= controllerClassName %>', <%= controllerClassName %>);
app.directive('<%= containerDirectiveName %>', <%= containerDirectiveClassName %>.directiveFactory);
app.directive('<%= directiveName %>', <%= directiveClassName%>.directiveFactory);
app.directive('<%= windowDirectiveName %>', <%= windowDirectiveClassName %>.directiveFactory);
app.run(route);
export default app = app.name
