import './component-main.tpl.html';
import './component-info.tpl.html';
import './component-edit.tpl.html';
import <%= serviceClassName %> from './component.service';
import <%= controllerClassName %> from './component.controller';
import <%= directiveClassName %> from './component.directive';

angular.module('<%= ngModuleName %>', ['sanji.window'])
  .service('<%= serviceName %>', <%= serviceClassName %>)
  .controller('<%= controllerClassName %>', <%= controllerClassName %>)
  .directive('<%= directiveName %>', <%= directiveClassName%>.directiveFactory);
