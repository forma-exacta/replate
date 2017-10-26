import {makeCRUDReducers} from './makeReducers'

const initialState = {
  byId: {
    one: {_id: 'one'}
  },
  allIds: ['one']
}

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

  it('CRUD handles create action', () => {
    const reducers = makeCRUDReducers('test')
    const createAction = {
      type: 'TEST:CREATE',
      payload: {
        _id: 'two',
      }
    }


    const newByIdState = reducers.byId(initialState.byId, createAction)
    expect(newByIdState).toEqual({
      ...initialState.byId,
      two: {_id: 'two'}
    })
    // immutable
    expect(initialState !== newByIdState)

    const newAllIdsState = reducers.allIds(initialState.allIds, createAction)
    expect(newAllIdsState).toEqual([
      ...initialState.allIds,
      'two'
    ])
    // immutable
    expect(initialState !== newAllIdsState)
  })

  it('CRUD handles update action', () => {
    const reducers = makeCRUDReducers('test')
    const updateAction = {
      type: 'TEST:UPDATE',
      payload: {
        _id: 'one',
        newProp: 'newProp'
      }
    }


    const newByIdState = reducers.byId(initialState.byId, updateAction)
    expect(newByIdState).toEqual({
      one: {
        _id: 'one',
        newProp: 'newProp'
      }
    })
    // immutable
    expect(initialState !== newByIdState)

    const newAllIdsState = reducers.allIds(initialState.allIds, updateAction)
    expect(initialState === newAllIdsState)
  })

  it('CRUD handles delete action', () => {
    const reducers = makeCRUDReducers('test')
    const deleteAction = {
      type: 'TEST:DELETE',
      payload: {
        _id: 'one',
      }
    }


    const newByIdState = reducers.byId(initialState.byId, deleteAction)
    expect(newByIdState).toEqual({})
    // immutable
    expect(initialState !== newByIdState)

    const newAllIdsState = reducers.allIds(initialState.allIds, deleteAction)
    expect(newAllIdsState).toEqual([])
    // immutable
    expect(initialState !== newAllIdsState)
  })

})
