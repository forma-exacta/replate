import {makeCRUDActionCreators} from './makeActionCreators'
import uuidv4 from 'uuid/v4'

describe('makeActionCreators', () => {

  it('CRUD creates crud methods', () => {
    const actionCreators = makeCRUDActionCreators('test')

    expect(actionCreators).toEqual(expect.objectContaining({
      create: expect.any(Function),
      update: expect.any(Function),
      delete: expect.any(Function),
    }))
  })

  it('CRUD create method returns create action', () => {
    const actionCreators = makeCRUDActionCreators('test')

    expect(actionCreators.create()).toEqual({
      payload: {_id: expect.any(String)}
    })

    // with payload
    expect(actionCreators.create({test: 'payload'})).toEqual({
      payload: {test: 'payload', _id: expect.any(String)}
    })
  })

  it('CRUD create method adds a uuid if none is provided', () => {
    const actionCreators = makeCRUDActionCreators('test')

    expect(actionCreators.create()).toEqual({
      payload: {_id: 'uuidmock'}
    })
  })

  it('CRUD create method uses id if it is provided', () => {
    const actionCreators = makeCRUDActionCreators('test')

    expect(actionCreators.create({_id: 'testid'})).toEqual({
      payload: {_id: 'testid'}
    })
  })

  it('CRUD update method requires id', () => {
    const actionCreators = makeCRUDActionCreators('test')

    expect(() => actionCreators.update()).toThrowError('id is required for update')

  })

  it('CRUD update method returns update action', () => {
    const actionCreators = makeCRUDActionCreators('test')

    expect(actionCreators.update('testid')).toEqual({
      payload: {_id: 'testid'}
    })

    // with payload
    expect(actionCreators.update('testid', {test: 'payload'})).toEqual({
      payload: {test: 'payload', _id: 'testid'}
    })
  })

  it('CRUD delete method returns delete action', () => {
    const actionCreators = makeCRUDActionCreators('test')

    expect(actionCreators.delete('testid')).toEqual({
      payload: {_id: 'testid'}
    })

  })

  it('CRUD delete method requires id', () => {
    const actionCreators = makeCRUDActionCreators('test')

    expect(() => actionCreators.delete()).toThrowError('id is required for delete')

  })

})
