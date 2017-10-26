import makeActionTypes, {crudPartials, makeCRUDActionTypes} from './makeActionTypes'

const testCRUDPartials = [
  'CREATE',
  'READ',
  'UPDATE',
  'DELETE',
]

describe('makeActionTypes', () => {

  it('generates all actionTypes for domain name', () => {
    const partials = ['P1', 'P2']
    const domainName = 'TEST1'

    expect(makeActionTypes(domainName, partials)).toEqual(partials.reduce((result, partial) => {
      const value = `${partial}_${domainName}`
      result[partial] = value
      return result
    }, {}))

    // touppercase
    expect(makeActionTypes('test2')).toEqual(testCRUDPartials.reduce((result, partial) => {
      const value = `${partial}_TEST2`
      result[partial] = value
      return result
    }, {}))
  })

  it('converts domainName to upperCase', () => {
    const partials = ['P1', 'P2']
    const domainName = 'test_upper'

    // touppercase
    expect(makeActionTypes(domainName, partials)).toEqual(partials.reduce((result, partial) => {
      const value = `${partial}_${domainName.toUpperCase()}`
      result[partial] = value
      return result
    }, {}))
  })

  it('converts partials to upperCase', () => {
    const partials = ['p1', 'p2']
    const domainName = 'TEST_PARTIAL_UPPER'

    // touppercase
    expect(makeActionTypes(domainName, partials)).toEqual(partials.reduce((result, partial) => {
      const value = `${partial.toUpperCase()}_${domainName}`
      result[partial.toUpperCase()] = value
      return result
    }, {}))
  })

  it('has CRUD actionType partials', () => {
    expect(crudPartials).toEqual(testCRUDPartials)
  })

  it('generates all CRUD action types', () => {
    const domainName = 'TESTCRUD'

    expect(makeCRUDActionTypes(domainName)).toEqual(testCRUDPartials.reduce((result, partial) => {
      const value = `${partial}_${domainName}`
      result[partial] = value
      return result
    }, {}))
  })

})
