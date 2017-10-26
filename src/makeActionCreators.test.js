import makeActionCreators from './makeActionCreators'

describe('makeActionCreators', () => {
  it('has one test', () => {
    expect(true)
  })

  it('creates action types', () => {
    const {actionTypes} = makeActionCreators('test')

    expect(actionTypes).toEqual({
      CREATE_TEST: 'CREATE_TEST',
      READ_TEST: 'READ_TEST',
      UPDATE_TEST: 'UPDATE_TEST',
      DELETE_TEST: 'DELETE_TEST'
    })
  })

  it('creates crud methods', () => {
    const {actionCreators} = makeActionCreators('test')

    expect(actionCreators).toEqual(expect.objectContaining({
      create: expect.any(Function),
      read: expect.any(Function),
      update: expect.any(Function),
      delete: expect.any(Function),
    }))
  })

  it('create method returns create action', () => {
    const dux = makeActionCreators('test')

    expect(dux.actionCreators.create()).toEqual({
      type: dux.actionTypes.CREATE_TEST
    })

    // with payload
    expect(dux.actionCreators.create({test: 'payload'})).toEqual({
      type: dux.actionTypes.CREATE_TEST,
      payload: {test: 'payload'}
    })
  })

  it('read method returns read action', () => {
    const dux = makeActionCreators('test')

    expect(dux.actionCreators.read('testid')).toEqual({
      type: dux.actionTypes.READ_TEST,
      payload: {id: 'testid'}
    })

  })

  it('read method requires id', () => {
    const dux = makeActionCreators('test')

    expect(() => dux.actionCreators.read()).toThrowError('id is required for read')

  })

  it('update method returns update action', () => {
    const dux = makeActionCreators('test')

    expect(dux.actionCreators.update()).toEqual({
      type: dux.actionTypes.UPDATE_TEST
    })

    // with payload
    expect(dux.actionCreators.update({test: 'payload'})).toEqual({
      type: dux.actionTypes.UPDATE_TEST,
      payload: {test: 'payload'}
    })
  })

  it('delete method returns delete action', () => {
    const dux = makeActionCreators('test')

    expect(dux.actionCreators.delete('testid')).toEqual({
      type: dux.actionTypes.DELETE_TEST,
      payload: {id: 'testid'}
    })

  })

  it('delete method requires id', () => {
    const dux = makeActionCreators('test')

    expect(() => dux.actionCreators.delete()).toThrowError('id is required for delete')

  })

})
