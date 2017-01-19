//-------------------------------------------------------------------
// Constants
//-------------------------------------------------------------------
export const GET_<%= constantModuleName %> = 'GET_<%= constantModuleName %>';
export const UPDATE_<%= constantModuleName %> = 'UPDATE_<%= constantModuleName %>';

//-------------------------------------------------------------------
// Actions
//-------------------------------------------------------------------

export const <%= actionClassName %> = ($q, <%= serviceName %>) => {
  'ngInject';

  const get<%= windowName %> = options => {
    return (dispatch, getState) => {
      const { <%= moduleName %> } = getState();

      <% if (isCollection) { %>
      if((options && !options.force) && <%= moduleName %>.length) {
      <% } else { %>
      if((options && !options.force) && Object.keys(<%= moduleName %>).length) {
      <% } %>
        return $q.when(<%= moduleName %>)
          .then(() => dispatch({ type: GET_<%= constantModuleName %>, payload: <%= moduleName %> }));
      } else {
        return <%= serviceName %>.get()
          .then(data => dispatch({ type: GET_<%= constantModuleName %>, payload: data }));
      }
    };
  };

  const update<%= windowName %> = data => {
    return dispatch => {
      if (data.formOptions.files) {
        return <%= serviceName %>.upload(data)
          .then(() => {
            data.formOptions = {};
            dispatch({ type: UPDATE_<%= constantModuleName %>, payload: data });
          });
      } else {
        return <%= serviceName %>.update(data)
          .then(() => dispatch({ type: UPDATE_<%= constantModuleName %>, payload: data }));
      }
    };
  };

  return {
    get<%= windowName %>,
    update<%= windowName %>
  };
};

//-------------------------------------------------------------------
// Reducers
//-------------------------------------------------------------------
<% if (isCollection) { %>
export const <%= moduleName %> = (state = [], {type, payload}) => {
  switch (type) {
    case GET_<%= constantModuleName %>:
      return payload || state;
    case UPDATE_<%= constantModuleName %>:
      return state.map(data => item(data, {type, payload}));
    default:
      return state;
  }
};

const item = (state, {type, payload}) => {
  switch (type) {
    case UPDATE_<%= constantModuleName %>:
      if (state.content.id !== payload.content.id) {
        return state;
      }
      return Object.assign({}, state, payload);
    default:
      return state;
  }
};
<% } else { %>
export const <%= moduleName %> = (state = {}, {type, payload}) => {
  switch (type) {
    case GET_<%= constantModuleName %>:
      return payload || state;
    case UPDATE_<%= constantModuleName %>:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
};
<% } %>