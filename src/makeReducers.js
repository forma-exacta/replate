import { combineReducers } from 'redux';
import createReducer from './createReducer'
import makeActionTypes from './makeActionTypes'

export default (domainName) => {

  const actionTypes = makeActionTypes(domainName)

  const rootReducer = createReducer({byId: {}, allIds:[]}, {

    [actionTypes.CREATE](state, action) {

    }

  })

  return combineReducers({
    [domainName]: rootReducer
  })

}
