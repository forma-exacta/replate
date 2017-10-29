import State from './src/State'
import {makeActionTypeFromActionName} from './src/makeActionTypes'

describe('README', () => {

  it('example 1', () => {
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

})
