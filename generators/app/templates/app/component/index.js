import sjCore from 'sanji-core-ui';

import './component-edit.tpl.html';
import './component.scss';
import <%= serviceClassName %> from './component.service';
import <%= containerControllerClassName %> from './component-container.controller';
import <%= controllerClassName %> from './component.controller';
import <%= containerDirectiveClassName %> from './component-container.directive';
import <%= directiveClassName %> from './component.directive';

let app = angular.module('<%= ngModuleName %>', [sjCore]);
app.service('<%= serviceName %>', <%= serviceClassName %>);
app.controller('<%= containerControllerClassName %>', <%= containerControllerClassName %>);
app.controller('<%= controllerClassName %>', <%= controllerClassName %>);
app.directive('<%= containerDirectiveName %>', <%= containerDirectiveClassName %>.directiveFactory);
app.directive('<%= directiveName %>', <%= directiveClassName%>.directiveFactory);
export default app = app.name
