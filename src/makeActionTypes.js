

export const crudPartials = [
  'CREATE',
  'READ',
  'UPDATE',
  'DELETE'
]

export const makeActionType = (partial, domainName) => {
  return `${partial}_${domainName.toUpperCase()}`
}

export const makeCRUDActionTypes = (domainName) => {
  return makeActionTypes(domainName, crudPartials)
}

const makeActionTypes = (domainName, partials) => {
  partials = partials || crudPartials

  return partials.reduce((result, partial) => {
    partial = partial.toUpperCase()
    const value = makeActionType(partial, domainName)
    result[partial] = value
    return result
  }, {})
}

export default makeActionTypes
