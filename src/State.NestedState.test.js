import State from './State'
import {makeActionTypeFromActionName} from './makeActionTypes'
import {combineReducers} from 'redux'

const makeCollectionState = () => {
  return new State('State', {}, {
    byId: new State('byId', {}, {
      add: (state, action) => ({
        ...state,
        [action.payload._id]: action.payload
      }),
      remove: (state, action) => {
        let newState = {...state}
        delete newState[action.payload._id]
        return newState
      }
    }),
    allIds: new State('allIds', [], {
      add: (state, action) => {
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
}

describe('State', () => {

  it('generates types, actions, and reducer', () => {
    const state = makeCollectionState()

    expect(state.actionTypes).toEqual({
      add: makeActionTypeFromActionName('State', 'add'),
      remove: makeActionTypeFromActionName('State', 'remove'),
    })
    expect(state.actions).toEqual({
      add: expect.any(Function),
      remove: expect.any(Function)
    })
    expect(state.reducer).toEqual({
      byId: expect.any(Function),
      allIds: expect.any(Function)
    })
  })

  it('sets default state', () => {
    const state = makeCollectionState()

    expect(combineReducers(state.reducer)(undefined, {})).toEqual({byId:{},allIds:[]})
  })

  it('reducer responds to all action types', () => {

    const state = makeCollectionState()

    const state1 = {
      byId: {1: {_id: 1}},
      allIds: [1]
    }

    expect(state.reducer.byId({}, {type: state.actionTypes.add, payload: {_id:1}})).toEqual({1: {_id: 1}})
    expect(state.reducer.byId({1: {_id: 1}}, {type: state.actionTypes.remove, payload: {_id:1}})).toEqual({})
    expect(state.reducer.allIds([], {type: state.actionTypes.add, payload: {_id:1}})).toEqual([1])
    expect(state.reducer.allIds([1], {type: state.actionTypes.remove, payload: {_id:1}})).toEqual([])
  })

})
