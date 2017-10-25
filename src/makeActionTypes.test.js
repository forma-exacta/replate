import makeActionTypes, {partials} from './makeActionTypes'

const testPartials = [
  'CREATE_START',
  'CREATE_SUCCESS',
  'CREATE_ERROR',

  'READ_START',
  'READ_SUCCESS',
  'READ_ERROR',

  'UPDATE_START',
  'UPDATE_SUCCESS',
  'UPDATE_ERROR',

  'DELETE_START',
  'DELETE_SUCCESS',
  'DELETE_ERROR',
]

describe('makeActionTypes', () => {

  it('generates actionType partials', () => {
    expect(partials).toEqual(testPartials)
  })

  it('generates all actionTypes for domain name', () => {
    expect(makeActionTypes('TEST1')).toEqual(testPartials.reduce((result, partial) => {
      const key = `TEST1_${partial}`
      result[key] = key
      return result
    }, {}))

    // touppercase
    expect(makeActionTypes('test2')).toEqual(testPartials.reduce((result, partial) => {
      const key = `TEST2_${partial}`
      result[key] = key
      return result
    }, {}))
  })

})
