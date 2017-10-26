import {makeActionTypeFromActionName, makeActionTypesFromActions} from './makeActionTypes'
import uuidv4 from 'uuid/v4'

export const makeCRUDActionCreators = (domainName) => {

  const actionCreators = {
    create: (payload) => {
      return {
        type: makeActionTypeFromActionName(domainName, 'create'),
        payload: {_id: uuidv4(), ...payload}
      }
    },
    read: (id) => {
      if(typeof id === 'undefined') {
        throw new Error('id is required for read')
      }

      return {
        type: makeActionTypeFromActionName(domainName, 'read'),
        payload: {_id: id}
      }
    },
    update: (id, payload) => {
      return {
        type: makeActionTypeFromActionName(domainName, 'update'),
        payload: {...payload, _id: id}
      }
    },
    delete: (id) => {
      if(typeof id === 'undefined') {
        throw new Error('id is required for delete')
      }

      return {
        type: makeActionTypeFromActionName(domainName, 'delete'),
        payload: {_id: id}
      }
    },
  }

  return actionCreators

}
