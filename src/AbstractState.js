import {makeActionTypeFromActionName} from './makeActionTypes'

export default class AbstractState {

  constructor(name, initialState, reducerParts = {}) {
    this.name = name
    this.initialState = initialState
    this.reducerParts = reducerParts
    this.actionTypes = {}
    this.actions = {}
  }

  makeActionType(actionName) {
    this.actionTypes[actionName] = makeActionTypeFromActionName(this.name, actionName)
  }

  makeAction(actionName) {
    this.actions[actionName] = (payload) => ({
      type: this.actionTypes[actionName],
      payload
    })
  }

}
