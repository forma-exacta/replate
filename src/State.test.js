import State from './State'

describe('State', () => {

  it('sets name to value passed in constructor', () => {
    expect((new State('test')).name).toEqual('test')
  })

  it('sets initial state passed in constructor', () => {
    expect((new State('test', {initial:'state'})).initialState).toEqual({initial:'state'})
  })

  it('makes action types with {underscored stateName}:{underscored action name} format', () => {
    const state = new State('stateName')
    state.makeActionType('actionName')

    expect(state.actionTypes.actionName).toEqual('STATE_NAME:ACTION_NAME')
  })

  it('makes actions that return corresponding type and payload', () => {
    const state = new State('stateName')
    state.makeActionType('actionName')
    state.makeAction('actionName')

    expect(state.actions.actionName({test:'payload'})).toEqual({
      type: 'STATE_NAME:ACTION_NAME',
      payload: {test:'payload'}
    })
  })

})
