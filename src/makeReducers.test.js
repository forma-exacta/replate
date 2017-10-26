import makeReducers from './makeReducers'

describe('makeReducers', () => {
  it('has one test', () => {
    expect(true)
  })

  it('creates default state', () => {
    expect(makeReducers('test')(undefined, {})).toEqual({
      test: {
        byId: {},
        allIds: []
      }
    })
  })
})
