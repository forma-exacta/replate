import {makeCRUDActionCreators} from './makeActionCreators'
import uuidv4 from 'uuid/v4'

describe('makeActionCreators', () => {

  it('CRUD creates crud methods', () => {
    const {actionCreators} = makeCRUDActionCreators('test')

    expect(actionCreators).toEqual(expect.objectContaining({
      create: expect.any(Function),
      read: expect.any(Function),
      update: expect.any(Function),
      delete: expect.any(Function),
    }))
  })

  it('CRUD create method returns create action', () => {
    const dux = makeCRUDActionCreators('test')

    expect(dux.actionCreators.create()).toEqual({
      type: dux.actionTypes.create,
      payload: {_id: expect.any(String)}
    })

    // with payload
    expect(dux.actionCreators.create({test: 'payload'})).toEqual({
      type: dux.actionTypes.create,
      payload: {test: 'payload', _id: expect.any(String)}
    })
  })

  it('CRUD create method adds a uuid if none is provided', () => {
    const dux = makeCRUDActionCreators('test')

    expect(dux.actionCreators.create()).toEqual({
      type: expect.any(String),
      payload: {_id: 'uuidmock'}
    })
  })

  it('CRUD create method uses id if it is provided', () => {
    const dux = makeCRUDActionCreators('test')

    expect(dux.actionCreators.create({_id: 'testid'})).toEqual({
      type: expect.any(String),
      payload: {_id: 'testid'}
    })
  })

  it('CRUD read method returns read action', () => {
    const dux = makeCRUDActionCreators('test')

    expect(dux.actionCreators.read('testid')).toEqual({
      type: dux.actionTypes.read,
      payload: {_id: 'testid'}
    })

  })

  it('CRUD read method requires id', () => {
    const dux = makeCRUDActionCreators('test')

    expect(() => dux.actionCreators.read()).toThrowError('id is required for read')

  })

  it('CRUD update method returns update action', () => {
    const dux = makeCRUDActionCreators('test')

    expect(dux.actionCreators.update('testid')).toEqual({
      type: dux.actionTypes.update,
      payload: {_id: 'testid'}
    })

    // with payload
    expect(dux.actionCreators.update('testid', {test: 'payload'})).toEqual({
      type: dux.actionTypes.update,
      payload: {test: 'payload', _id: 'testid'}
    })
  })

  it('CRUD delete method returns delete action', () => {
    const dux = makeCRUDActionCreators('test')

    expect(dux.actionCreators.delete('testid')).toEqual({
      type: dux.actionTypes.delete,
      payload: {_id: 'testid'}
    })

  })

  it('CRUD delete method requires id', () => {
    const dux = makeCRUDActionCreators('test')

    expect(() => dux.actionCreators.delete()).toThrowError('id is required for delete')

  })

})
