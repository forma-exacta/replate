

export const partials = [
  'CREATE',
  'READ',
  'UPDATE',
  'DELETE'
]

export const makeActionType = (partial, domainName) => {
  return `${partial}_${domainName.toUpperCase()}`
}

export default (domainName) => {
  return partials.reduce((result, partial) => {
    const value = makeActionType(partial, domainName)
    result[partial] = value
    return result
  }, {})
}
