import {makeActionTypeFromActionName, makeActionTypesFromActions} from './makeActionTypes'
import uuidv4 from 'uuid/v4'

export const makeCRUDActionCreators = (domainName) => {

  const actionCreators = {
    create: (payload) => {
      return {
        payload: {_id: uuidv4(), ...payload}
      }
    },
    update: (id, payload) => {
      if(typeof id === 'undefined') {
        throw new Error('id is required for update')
      }

      return {
        payload: {...payload, _id: id}
      }
    },
    delete: (id) => {
      if(typeof id === 'undefined') {
        throw new Error('id is required for delete')
      }

      return {
        payload: {_id: id}
      }
    },
  }

  return actionCreators

}
