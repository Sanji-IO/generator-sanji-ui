const <%= windowComponentClassName %> = {
  template: `<sanji-window window-id="<%= appname %>"
              window-name="{{'<%= constantModuleName %>' | translate}}"
              show-loading-btn>
              <sanji-window-state default-state
                state-name="sanji-form"
                link-name="{{'<%= constantModuleName %>_FORM_SETTING' | translate}}"
                icon="settings">
                <<%= componentTplName %>-container></<%= componentTplName %>-container>
              </sanji-window-state>
            </sanji-window>`
};
export default <%= windowComponentClassName %>;
