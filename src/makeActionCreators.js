import {makeCRUDActionTypes} from './makeActionTypes'
import uuidv4 from 'uuid/v4'

export const makeCRUDActionCreators = (domainName) => {

  const actionTypes = makeCRUDActionTypes(domainName)

  const actionCreators = {
    create: (payload) => {
      return {
        type: actionTypes.CREATE,
        payload: {_id: uuidv4(), ...payload}
      }
    },
    read: (id) => {
      if(typeof id === 'undefined') {
        throw new Error('id is required for read')
      }

      return {
        type: actionTypes.READ,
        payload: {_id: id}
      }
    },
    update: (id, payload) => {
      return {
        type: actionTypes.UPDATE,
        payload: {...payload, _id: id}
      }
    },
    delete: (id) => {
      if(typeof id === 'undefined') {
        throw new Error('id is required for delete')
      }

      return {
        type: actionTypes.DELETE,
        payload: {_id: id}
      }
    },
  }

  return {
    actionTypes,
    actionCreators
  }

}
