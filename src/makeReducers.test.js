import {makeCRUDReducers} from './makeReducers'

describe('makeReducers', () => {
  it('has one test', () => {
    expect(true)
  })

  it('CRUD creates default reducers', () => {
    expect(makeCRUDReducers('test')).toEqual({
      byId: expect.any(Function),
      allIds: expect.any(Function)
    })
  })
})
