import AbstractState from './AbstractState'
import {makeReducer} from './makeReducer'

export default class State extends AbstractState {

  constructor(name, initialState, reducerParts = {}) {
    super(name, initialState, reducerParts)

    this.init()
  }

  init() {
    const reducerKeys = Object.keys(this.reducerParts)
    if(reducerKeys.length < 1) {
      this.reducer = () => this.initialState // don't know why you want static state, but there you go
    }
    else if(this.reducerParts[reducerKeys[0]] instanceof AbstractState) {
      // 'Nested' State
      this.reducer = this.makeSubState(this.reducerParts)
    }
    else {
      // 'Value' State
      this.reducer = makeReducer(this.initialState, this.makeReducerMap(this.reducerParts))
    }
  }

  reinit() {
    this.actionTypes = {}
    this.actions = {}
    this.reducer = undefined
    this.init()
  }

  makeReducerMap(reducerParts) {
    return Object.keys(reducerParts).reduce((result, key) => {
      this.makeActionType(key)
      this.makeAction(key)

      result[this.actionTypes[key]] = reducerParts[key]
      return result
    }, {})
  }

  makeSubState(reducerParts) {
    return Object.keys(reducerParts).reduce((result, key) => {
      const subState = reducerParts[key]
      subState.name = this.name
      subState.reinit()
      Object.assign(this.actionTypes, subState.actionTypes)
      Object.assign(this.actions, subState.actions)

      result[key] = subState.reducer
      return result
    }, {})
  }

}
