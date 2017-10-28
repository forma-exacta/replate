import {makeActionTypeFromActionName} from './makeActionTypes'

export default class State {

  constructor(name, initialState) {
    this.name = name
    this.initialState = initialState
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
