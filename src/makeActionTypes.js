

export const partials = [
  'CREATE',
  'READ',
  'UPDATE',
  'DELETE'
]

export default (domainName) => {
  return partials.reduce((result, partial) => {
    const key = `${partial}_${domainName.toUpperCase()}`
    result[key] = key
    return result
  }, {})
}
