import State from './State'
import {makeActionTypeFromActionName} from './makeActionTypes'

describe('State', () => {

  it('generates types, actions, and reducer', () => {
    const state = new State('State', null, {
      set: () => action.payload,
      inc: () => state + action.payload
    })

    expect(state.actionTypes).toEqual({
      set: makeActionTypeFromActionName('State', 'set'),
      inc: makeActionTypeFromActionName('State', 'inc'),
    })
    expect(state.actions).toEqual({
      set: expect.any(Function),
      inc: expect.any(Function)
    })
    expect(state.reducer).toEqual(expect.any(Function))
  })

  it('sets default state', () => {
    const state = new State('State', 'defaultState')

    expect(state.reducer(undefined, {})).toEqual('defaultState')
  })

  it('reducer responds to all action types', () => {
    const state = new State('State', null, {
      set: (state, action) => action.payload,
      inc: (state, action) => state + action.payload
    })

    expect(state.reducer(null, {type: state.actionTypes.set, payload: 1})).toEqual(1)
    expect(state.reducer(1, {type: state.actionTypes.inc, payload: 2})).toEqual(3)
  })

})
