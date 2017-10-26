import makeActionTypes from './makeActionTypes'

export default (domainName) => {

  const actionTypes = makeActionTypes(domainName)

  const actionCreators = {
    create: (payload) => {
      return {
        type: actionTypes[`CREATE_${domainName.toUpperCase()}`],
        payload
      }
    },
    read: (id) => {
      if(typeof id === 'undefined') {
        throw new Error('id is required for read')
      }

      return {
        type: actionTypes[`READ_${domainName.toUpperCase()}`],
        payload: {id}
      }
    },
    update: (payload) => {
      return {
        type: actionTypes[`UPDATE_${domainName.toUpperCase()}`],
        payload
      }
    },
    delete: (id) => {
      if(typeof id === 'undefined') {
        throw new Error('id is required for delete')
      }

      return {
        type: actionTypes[`DELETE_${domainName.toUpperCase()}`],
        payload: {id}
      }
    },
  }

  return {
    actionTypes,
    actionCreators
  }

}
