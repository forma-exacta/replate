import Collection from './Collection'
import {makeActionTypeFromActionName} from './makeActionTypes'

describe('Collection', () => {

  it('generates types, actions, and reducer', () => {
    const state = new Collection('CollectionTest')

    expect(state.actionTypes).toEqual({
      upsert: makeActionTypeFromActionName('CollectionTest', 'upsert'),
      remove: makeActionTypeFromActionName('CollectionTest', 'remove'),
    })
    expect(state.actions).toEqual({
      upsert: expect.any(Function),
      remove: expect.any(Function)
    })
    expect(state.reducer).toEqual(expect.any(Function))
  })

  it('sets default state', () => {
    const state = new Collection('CollectionTest')

    expect(state.reducer(undefined, {})).toEqual({byId: {}, allIds: []})
  })

  it('::upsert inserts a new element with an id', () => {

    const state = new Collection('CollectionTest')
    const action = state.actions.upsert({name: 'test'})
    const newState = state.reducer(undefined, action)

    expect(newState.allIds.length).toBe(1)
    const id = newState.allIds[0]
    expect(newState.byId[id]).toEqual({_id: id, name: 'test'})

  })

  it('::upsert updates an existing element', () => {

    const state = new Collection('CollectionTest')
    const initialState = {
      byId: {1:{_id:1, upsert: 'test'}},
      allIds: [1]
    }
    const action = state.actions.upsert({_id: 1, add: 'new property'})
    const newState = state.reducer(initialState, action)

    expect(newState.allIds.length).toBe(1)
    expect(newState.byId[1]).toEqual({_id: 1, add: 'new property'})

  })

  it('::delete removes an existing element', () => {

    const state = new Collection('CollectionTest')
    const initialState = {
      byId: {1:{_id:1, upsert: 'test'}},
      allIds: [1]
    }
    const action = state.actions.remove({_id: 1})
    const newState = state.reducer(initialState, action)

    expect(newState.allIds.length).toBe(0)
    expect(newState.byId[1]).not.toBeDefined()

  })

})
