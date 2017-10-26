import uuidv4 from 'uuid/v4'
import { combineReducers } from 'redux';
import createReducer from './createReducer'

export default (domainName) => {

  const rootReducer = createReducer({byId: {}, allIds:[]}, {

  })

  return combineReducers({
    [domainName]: rootReducer
  })

}
