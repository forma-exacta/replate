import makeActionTypes, {crudPartials, makeCRUDActionTypes, makeActionType} from './makeActionTypes'

const testCRUDPartials = [
  'CREATE',
  'READ',
  'UPDATE',
  'DELETE',
]

describe('makeActionTypes', () => {

  it('- makeActionType concatenates partial and domain name', () => {
    expect(makeActionType('DOMAIN', 'PARTIAL')).toEqual('DOMAIN:PARTIAL')
  })

  it('- makeActionType converts domain and partial to upperCase', () => {
    expect(makeActionType('domain', 'partial')).toEqual('DOMAIN:PARTIAL')
  })

  it('generates all actionTypes for domain name', () => {
    const partials = ['P1', 'P2']
    const domainName = 'TEST1'

    expect(makeActionTypes(domainName, partials)).toEqual(partials.reduce((result, partial) => {
      result[partial] = makeActionType(domainName, partial)
      return result
    }, {}))
  })

  it('converts domainName to upperCase', () => {
    const partials = ['P1', 'P2']
    const domainName = 'test_upper'

    // touppercase
    expect(makeActionTypes(domainName, partials)).toEqual(partials.reduce((result, partial) => {
      const value = `${domainName.toUpperCase()}:${partial}`
      result[partial] = value
      return result
    }, {}))
  })

  it('converts partials to upperCase', () => {
    const partials = ['p1', 'p2']
    const domainName = 'TEST_PARTIAL_UPPER'

    // touppercase
    expect(makeActionTypes(domainName, partials)).toEqual(partials.reduce((result, partial) => {
      const value = `${domainName}:${partial.toUpperCase()}`
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
      result[partial] = makeActionType(domainName, partial)
      return result
    }, {}))
  })

})
