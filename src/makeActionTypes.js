

export const crudPartials = [
  'CREATE',
  'READ',
  'UPDATE',
  'DELETE'
]

export const makeActionType = (domainName, partial) => {
  return `${domainName.toUpperCase()}:${partial.toUpperCase()}`
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
