import makeActionTypes from './makeActionTypes'

export const reducer = (initialState, handlers) => {
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

  const byId = reducer({byId: {}}, {
    [actionTypes.CREATE](state, action) {

    }
  })

  const allIds = reducer({allIds: []}, {
    [actionTypes.CREATE](state, action) {

    }
  })

  return {byId, allIds}

}
