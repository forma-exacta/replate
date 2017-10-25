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
    expect(makeActionTypes('test1')).toEqual(testPartials.map(partial => `TEST1_${partial}`))
    expect(makeActionTypes('TEST2')).toEqual(testPartials.map(partial => `TEST2_${partial}`))
  })

})
