

export const crudPartials = [
  'CREATE',
  'READ',
  'UPDATE',
  'DELETE'
]

export const makeActionType = (domainName, partial) => {
  return `${domainName.toUpperCase()}:${partial.toUpperCase()}`
}

const makeActionTypeFromActionName = (domainName, actionName) => {
  let underscored = actionName.replace(/([a-z]+)([A-Z0-9]+)/g, '$1_$2')
  underscored = underscored.replace(/([A-Z0-9]{2,})([a-z]+)/g, ($1, $2, $3) => {
    return `${$2.substring(0, $2.length - 1)}_${$2.substring($2.length - 1)}${$3}`
  })
  underscored = underscored.toUpperCase()
  return {[actionName]: makeActionType(domainName, underscored)}
}

export const makeActionTypesFromActions = (domainName, actions) => {
  return Object.keys(actions).reduce((result, actionName) => {
    return {...result, ...makeActionTypeFromActionName(domainName, actionName)}
  }, {})
}

export const makeCRUDActionTypes = (domainName) => {
  return makeActionTypes(domainName, crudPartials)
}

const makeActionTypes = (domainName, partials) => {
  partials = partials || crudPartials

  return partials.reduce((result, partial) => {
    result[partial.toUpperCase()] = makeActionType(domainName, partial)
    return result
  }, {})
}

export default makeActionTypes
