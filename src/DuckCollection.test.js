import DuckCollection from './DuckCollection'

describe('DuckCollection', () => {
  it('has one test', () => {
    expect(true)
  })

  it('has crud action types', () => {
    const duck = new DuckCollection('test')

    expect(duck.actionTypes).toEqual({
      create: 'TEST:CREATE',
      update: 'TEST:UPDATE',
      delete: 'TEST:DELETE'
    })
  })

  it('has crud actions', () => {
    const duck = new DuckCollection('test')

    expect(duck.actions).toEqual({
      create: expect.any(Function),
      update: expect.any(Function),
      delete: expect.any(Function),
    })
  })

  it('can add additional actions', () => {
    const duck = new DuckCollection('test')

    duck.addAction('newAction', () => {})

    expect(duck.actionTypes).toEqual(expect.objectContaining({
      newAction: 'TEST:NEW_ACTION'
    }))

    expect(duck.actions).toEqual(expect.objectContaining({
      newAction: expect.any(Function)
    }))
  })

})
