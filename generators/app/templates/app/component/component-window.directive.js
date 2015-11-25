const injectMap = new WeakMap();
const $inject = [];
class <%= windowDirectiveClassName %> {
  constructor(injects) {
    <%= windowDirectiveClassName %>.directiveFactory.$inject.forEach((item, index) => {
      <%= windowDirectiveClassName %>[item] = injects[index];
      injectMap.set(<%= windowDirectiveClassName %>[item], injects[index]);
    });
    this.restrict = 'E';
    this.template = `<sanji-window window-id="<%= appname %>"
                      window-name="{{'<%= constantModuleName %>' | translate}}"
                      show-loading-btn>
                      <sanji-window-state default-state
                        state-name="sanji-form"
                        link-name="{{'<%= constantModuleName %>_FORM_SETTING' | translate}}"
                        icon="settings">
                        <<%= directiveTplName %>-container></<%= directiveTplName %>-container>
                      </sanji-window-state>
                    </sanji-window>`;
  }

  static directiveFactory(...injects) {
    <%= windowDirectiveClassName %>.instance = new <%= windowDirectiveClassName %>(injects);
    return <%= windowDirectiveClassName %>.instance;
  }
}
<%= windowDirectiveClassName %>.directiveFactory.$inject = $inject;
export default <%= windowDirectiveClassName %>
