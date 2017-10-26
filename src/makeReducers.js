import { combineReducers } from 'redux';
import createReducer from './createReducer'
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

export const makeCRUDReducer = (domainName) => {

  const actionTypes = makeActionTypes(domainName)

  const rootReducer = reducer({byId: {}, allIds:[]}, {

    [actionTypes.CREATE](state, action) {

    }

  })

  return rootReducer

}
