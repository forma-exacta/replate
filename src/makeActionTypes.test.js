import makeActionTypes, {partials} from './makeActionTypes'

const testPartials = [
  'CREATE',
  'READ',
  'UPDATE',
  'DELETE',
]

describe('makeActionTypes', () => {

  it('has actionType partials', () => {
    expect(partials).toEqual(testPartials)
  })

  it('generates all actionTypes for domain name', () => {
    expect(makeActionTypes('TEST1')).toEqual(testPartials.reduce((result, partial) => {
      const key = `${partial}_TEST1`
      result[key] = key
      return result
    }, {}))

    // touppercase
    expect(makeActionTypes('test2')).toEqual(testPartials.reduce((result, partial) => {
      const key = `${partial}_TEST2`
      result[key] = key
      return result
    }, {}))
  })

})
