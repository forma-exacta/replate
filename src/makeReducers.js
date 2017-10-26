import makeActionTypes from './makeActionTypes'

export const makeReducer = (initialState, handlers) => {
  return function reducer(state = initialState, action) {
    if(handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    else {
      return state;
    }
  }
}

export const makeCRUDReducers = (domainName) => {

  const actionTypes = makeActionTypes(domainName)

  const byId = makeReducer({byId: {}}, {
    [actionTypes.CREATE](state, action) {

    }
  })

  const allIds = makeReducer({allIds: []}, {
    [actionTypes.CREATE](state, action) {

    }
  })

  return {byId, allIds}

}
