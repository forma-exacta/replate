import {combineReducers} from 'redux'
import makeActionTypes, {makeActionType, makeActionTypeFromActionName} from './makeActionTypes'

export default class Duck {

  constructor(domainName) {
    this._domainName = domainName
    this._actionTypes = {}
    this._actions = {}
    this._reducers = {}
    this._reducer = () => {}
  }

  get domainName() {return this._domainName}
  get actionTypes() {return this._actionTypes}
  get actions() {return this._actions}
  get reducer() {return this._reducer}

  addAction(actionName, action) {
    const actionType = makeActionTypeFromActionName(this._domainName, actionName)
    this._actionTypes[actionName] = actionType
    this._actions[actionName] = (...args) => {
      return {
        type: actionType,
        ...action(...args)
      }
    }
  }

  addReducer(reducerName, reducer) {
    this._reducers[reducerName] = reducer
    this._reducer = combineReducers(this._reducers)
  }

  setActions(actions) {
    this._actions = {}
    Object.keys(actions).forEach((actionName) => this.addAction(actionName, actions[actionName]))
  }

  setReducers(reducers) {
    this._reducers = {}
    Object.keys(reducers).forEach((reducerName) => this.addReducer(reducerName, reducers[reducerName]))
  }

}
