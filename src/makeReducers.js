import {makeCRUDActionTypes} from './makeActionTypes'

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

  const actionTypes = makeCRUDActionTypes(domainName)

  const byId = makeReducer({}, {
    [actionTypes.CREATE](state, action) {
      return {...state, [action.payload._id]: action.payload}
    },
    [actionTypes.UPDATE](state, action) {
      return {...state, [action.payload._id]: action.payload}
    },
    [actionTypes.DELETE](state, action) {
      let newState = {...state}
      delete newState[action.payload._id]
      return newState
    },
  })

  const allIds = makeReducer([], {
    [actionTypes.CREATE](state, action) {
      let newState = state.slice()
      newState.push(action.payload._id)
      return newState
    },
    [actionTypes.DELETE](state, action) {
      let newState = state.slice();
      newState.splice(newState.indexOf(action.payload._id), 1)
      return newState
    }
  })

  return {byId, allIds}

}
