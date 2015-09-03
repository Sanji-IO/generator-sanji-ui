import './component-main.tpl.html';
import './component-info.tpl.html';
import './component-edit.tpl.html';
import './component.scss';
import <%= serviceClassName %> from './component.service';
import <%= containerControllerClassName %> from './component-container.controller';
import <%= controllerClassName %> from './component.controller';
import <%= containerDirectiveClassName %> from './component-container.directive';
import <%= directiveClassName %> from './component.directive';

angular.module('<%= ngModuleName %>', ['sanji.window'])
  .service('<%= serviceName %>', <%= serviceClassName %>)
  .controller('<%= containerControllerClassName %>', <%= containerControllerClassName %>)
  .controller('<%= controllerClassName %>', <%= controllerClassName %>)
  .directive('<%= containerDirectiveName %>', <%= containerDirectiveClassName %>.directiveFactory)
  .directive('<%= directiveName %>', <%= directiveClassName%>.directiveFactory);
