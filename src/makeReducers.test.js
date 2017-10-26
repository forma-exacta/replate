import {makeCRUDReducer} from './makeReducers'

describe('makeReducers', () => {
  it('has one test', () => {
    expect(true)
  })

  it('creates default state', () => {
    expect(makeCRUDReducer('test')(undefined, {})).toEqual({
      byId: {},
      allIds: []
    })
  })
})
