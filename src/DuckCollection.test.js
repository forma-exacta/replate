import DuckCollection from './DuckCollection'

describe('DuckCollection', () => {
  it('has one test', () => {
    expect(true)
  })

  it('has crud action types', () => {
    const duck = new DuckCollection('test')

    expect(duck.actionTypes).toEqual({
      create: 'TEST:CREATE',
      read: 'TEST:READ',
      update: 'TEST:UPDATE',
      delete: 'TEST:DELETE'
    })
  })

  it('has crud actions', () => {
    const duck = new DuckCollection('test')

    expect(duck.actions).toEqual({
      create: expect.any(Function),
      read: expect.any(Function),
      update: expect.any(Function),
      delete: expect.any(Function),
    })
  })

})
