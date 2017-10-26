import makeActionCreators from './makeActionCreators'
import uuidv4 from 'uuid/v4'

describe('makeActionCreators', () => {

  it('creates action types', () => {
    const {actionTypes} = makeActionCreators('test')

    expect(actionTypes).toEqual({
      CREATE: 'CREATE_TEST',
      READ: 'READ_TEST',
      UPDATE: 'UPDATE_TEST',
      DELETE: 'DELETE_TEST'
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
      type: dux.actionTypes.CREATE,
      payload: {_id: expect.any(String)}
    })

    // with payload
    expect(dux.actionCreators.create({test: 'payload'})).toEqual({
      type: dux.actionTypes.CREATE,
      payload: {test: 'payload', _id: expect.any(String)}
    })
  })

  it('create method adds a uuid if none is provided', () => {
    const dux = makeActionCreators('test')

    expect(dux.actionCreators.create()).toEqual({
      type: expect.any(String),
      payload: {_id: 'uuidmock'}
    })
  })

  it('create method uses id if it is provided', () => {
    const dux = makeActionCreators('test')

    expect(dux.actionCreators.create({_id: 'testid'})).toEqual({
      type: expect.any(String),
      payload: {_id: 'testid'}
    })
  })

  it('read method returns read action', () => {
    const dux = makeActionCreators('test')

    expect(dux.actionCreators.read('testid')).toEqual({
      type: dux.actionTypes.READ,
      payload: {_id: 'testid'}
    })

  })

  it('read method requires id', () => {
    const dux = makeActionCreators('test')

    expect(() => dux.actionCreators.read()).toThrowError('id is required for read')

  })

  it('update method returns update action', () => {
    const dux = makeActionCreators('test')

    expect(dux.actionCreators.update('testid')).toEqual({
      type: dux.actionTypes.UPDATE,
      payload: {_id: 'testid'}
    })

    // with payload
    expect(dux.actionCreators.update('testid', {test: 'payload'})).toEqual({
      type: dux.actionTypes.UPDATE,
      payload: {test: 'payload', _id: 'testid'}
    })
  })

  it('delete method returns delete action', () => {
    const dux = makeActionCreators('test')

    expect(dux.actionCreators.delete('testid')).toEqual({
      type: dux.actionTypes.DELETE,
      payload: {_id: 'testid'}
    })

  })

  it('delete method requires id', () => {
    const dux = makeActionCreators('test')

    expect(() => dux.actionCreators.delete()).toThrowError('id is required for delete')

  })

})
