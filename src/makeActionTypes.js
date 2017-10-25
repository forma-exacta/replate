

const partialActions = [
  'CREATE',
  'READ',
  'UPDATE',
  'DELETE'
]

const partialStatuses = [
  'START',
  'SUCCESS',
  'ERROR'
]

export const partials = partialActions.reduce((result, partialAction) => {
  partialStatuses.forEach(partialStatus => result.push(`${partialAction}_${partialStatus}`))
  return result
}, [])

export default (domainName) => {
  return partials.reduce((result, partial) => {
    const key = `${domainName.toUpperCase()}_${partial}`
    result[key] = key
    return result
  }, {})
}
