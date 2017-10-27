import {combineReducers} from 'redux'
import makeActionTypes, {makeActionType, makeActionTypeFromActionName} from './makeActionTypes'
import {makeReducer} from './makeReducers'

const addActionOptions = {
  addActionType: true
}

const addReducerOptions = {
  addAction: true
}

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
  get reducers() {return this._reducers}
  get reducer() {return this._reducer}

  addActionType(typeName) {
    this._actionTypes[typeName] = makeActionType(this._domainName, typeName)
  }

  addAction(actionName, action, options) {
    options = {...addActionOptions, ...options}

    if(options.addActionType) {
      const actionType = makeActionTypeFromActionName(this._domainName, actionName)
      this._actionTypes[actionName] = actionType
      this._actions[actionName] = (...args) => {
        return {
          type: actionType,
          ...action(...args)
        }
      }
    }
    else {
      this._actions[actionName] = action
    }
  }

  addReducer(reducerName, reducer, options) {
    options = {...addReducerOptions, ...options}

    if(options.addAction) {
      this.addAction(reducerName, (payload) => {return {payload}}, {addActionType: true})
      this._reducers[reducerName] = makeReducer(options.initialState || null, {
        [this._actionTypes[reducerName]](state, action) {
          return reducer(state, action)
        }
      })
    }
    else {
      this._reducers[reducerName] = reducer
    }
    this._reducer = combineReducers(this._reducers)
  }

  setActions(actions, options) {
    this._actions = {}
    Object.keys(actions).forEach((actionName) => this.addAction(actionName, actions[actionName], options))
  }

  setReducers(reducers, options) {
    this._reducers = {}
    Object.keys(reducers).forEach((reducerName) => this.addReducer(reducerName, reducers[reducerName], options))
  }

}
