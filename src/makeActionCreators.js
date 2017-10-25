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
    read: () => {},
    update: () => {},
    delete: () => {},
  }

  return {
    actionTypes,
    actionCreators
  }

}
