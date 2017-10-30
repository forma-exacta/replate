import State from './src/State'
import Collection from './src/Collection'
import {makeActionTypeFromActionName} from './src/makeActionTypes'
import {combineReducers} from 'redux'

describe('README', () => {

  it('value state example', () => {
    const valueState = new State('counter', 0, {
      set: (state, action) => action.payload,
      inc: (state, action) => state + 1,
      dec: (state, action) => state - 1
    })

    // Generate action types
    expect(valueState.actionTypes.set).toEqual('COUNTER:SET')
    expect(valueState.actionTypes.inc).toEqual('COUNTER:INC')
    expect(valueState.actionTypes.dec).toEqual('COUNTER:DEC')

    // Generate actions
    const setAction = valueState.actions.set(10)
    expect(setAction).toEqual({
      type: valueState.actionTypes.set,
      payload: 10
    })

    const incAction = valueState.actions.inc()
    expect(incAction).toEqual({
      type: valueState.actionTypes.inc
    })

    const decAction = valueState.actions.dec()
    expect(decAction).toEqual({
      type: valueState.actionTypes.dec
    })

    // Generate reducers
    expect(valueState.reducer(undefined, {})).toEqual(0) // default value
    expect(valueState.reducer(undefined, setAction)).toEqual(10)
    expect(valueState.reducer(10, incAction)).toEqual(11)
    expect(valueState.reducer(11, decAction)).toEqual(10)

  })

  it('nested state example', () => {
    const collection = new State('Collection', {}, {
      byId: new State('byId', {}, {
        upsert: (state, action) => {
          action.payload._id = action.payload._id

          return {
            ...state,
            [action.payload._id]: action.payload
          }
        },
        remove: (state, action) => {
          let newState = {...state}
          delete newState[action.payload._id]
          return newState
        }
      }),
      allIds: new State('allIds', [], {
        upsert: (state, action) => {
          if(state.includes(action.payload._id))
            return state

          let newState = state.slice()
          newState.push(action.payload._id)
          return newState
        },
        remove: (state, action) => {
          let newState = state.slice();
          newState.splice(newState.indexOf(action.payload._id), 1)
          return newState
        }
      })
    })

    // ACTION TYPES
    expect(collection.actionTypes.upsert).toEqual('COLLECTION:UPSERT')
    expect(collection.actionTypes.remove).toEqual('COLLECTION:REMOVE')

    // ACTION CREATORS
    const upsertAction = collection.actions.upsert({_id: 1, value: 'one'})
    expect(upsertAction).toEqual({
      type: collection.actionTypes.upsert,
      payload: {_id: 1, value: 'one'}
    })

    const removeAction = collection.actions.remove({_id: 1})
    expect(removeAction).toEqual({
      type: collection.actionTypes.remove,
      payload: {_id: 1}
    })

    // REDUCER

    // This is a little easier if we combine
    const reducer = combineReducers(collection.reducer)

    // undefined state and empty action returns initial state
    expect(reducer(undefined, {})).toEqual({
      byId: {},
      allIds: []
    })

    // we're going to want this again, so lets define it here
    const nextState = {
      byId: {
        1: {
          _id: 1,
          value: 'one'
        }
      },
      allIds: [1]
    }

    // upsert and the state includes the new
    expect(reducer(undefined, upsertAction)).toEqual(nextState)

    // remove the item and we're back to the initial state
    expect(reducer(nextState, removeAction)).toEqual({
      byId: {},
      allIds: []
    })
  })

  it('collection example', () => {
    const collection = new Collection('screens')

    expect(collection.actionTypes.upsert).toEqual('SCREENS:UPSERT')
    expect(collection.actionTypes.remove).toEqual('SCREENS:REMOVE')
  })

})
