import Collection from './Collection'
import {makeActionTypeFromActionName} from './makeActionTypes'
import {combineReducers} from 'redux'  // I probably shouldn't do this, but f it
import State from './State'

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
    expect(combineReducers(state.reducer)).toEqual(expect.any(Function))
  })

  it('sets default state', () => {
    const state = new Collection('CollectionTest')

    expect(combineReducers(state.reducer)(undefined, {})).toEqual({byId: {}, allIds: []})
  })

  it('::upsert inserts a new element with an id', () => {

    const state = new Collection('CollectionTest')
    const action = state.actions.upsert({name: 'test'})
    const newState = combineReducers(state.reducer)(undefined, action)

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
    const newState = combineReducers(state.reducer)(initialState, action)

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
    const newState = combineReducers(state.reducer)(initialState, action)

    expect(newState.allIds.length).toBe(0)
    expect(newState.byId[1]).not.toBeDefined()

  })

  it('accepts additional substate', () => {
    const state = new Collection('CollectionTest', {another: 'substate'}, {
      another: new State('another', null, {
        testAction: () => ({})
      })
    })

    expect(state.actionTypes.testAction).toBeDefined()
    expect(state.actions.testAction).toEqual(expect.any(Function))
  })

})
