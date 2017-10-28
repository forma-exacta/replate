import ComplexState from './ComplexState'
import {makeActionTypeFromActionName} from './makeActionTypes'

describe('ComplexState', () => {

  it('generates types, actions, and reducer', () => {
    const state = new ComplexState('ComplexState', {byId:{},allIds:[]}, {
      byId: {
        add: (state, action) => ({
          ...state,
          [action.payload._id]: action.payload
        }),
        remove: (state, action) => {
          let newState = {...state}
          delete newState[action.payload._id]
          return newState
        }
      },
      allIds: {
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
      }
    })

    expect(state.actionTypes).toEqual({
      add: makeActionTypeFromActionName('ComplexState', 'add'),
      remove: makeActionTypeFromActionName('ComplexState', 'remove'),
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
    const state = new ComplexState('ComplexState', {default: 'state'})

    expect(state.reducer(undefined, {})).toEqual({default: 'state'})
  })

  it('reducer responds to all action types', () => {

    const state = new ComplexState('ComplexState', {byId: {}, allIds: []}, {
      byId: {
        add: (state, action) => ({
          ...state,
          [action.payload._id]: action.payload
        }),
        remove: (state, action) => {
          let newState = {...state}
          delete newState[action.payload._id]
          return newState
        }
      },
      allIds: {
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
      }
    })

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
