import AbstractState from './AbstractState'

describe('AbstractState', () => {

  it('sets name to value passed in constructor', () => {
    expect((new AbstractState('test')).name).toEqual('test')
  })

  it('sets initial state passed in constructor', () => {
    expect((new AbstractState('test', {initial:'state'})).initialState).toEqual({initial:'state'})
  })

  it('makes action types with {underscored stateName}:{underscored action name} format', () => {
    const state = new AbstractState('stateName')
    state.makeActionType('actionName')

    expect(state.actionTypes.actionName).toEqual('STATE_NAME:ACTION_NAME')
  })

  it('makes actions that return corresponding type and payload', () => {
    const state = new AbstractState('stateName')
    state.makeActionType('actionName')
    state.makeAction('actionName')

    expect(state.actions.actionName({test:'payload'})).toEqual({
      type: 'STATE_NAME:ACTION_NAME',
      payload: {test:'payload'}
    })
  })

})
