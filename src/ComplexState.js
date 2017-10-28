import State from './State'
import {makeReducer} from './makeReducer'

export default class ComplexState extends State {

  constructor(name, initialState, subState = {}) {
    super(name, initialState)

    const subReducers = Object.keys(subState).reduce((subsResult, subsKey) => {

      const modifiedParts = Object.keys(subState[subsKey]).reduce((result, key) => {
        this.makeActionType(key)
        this.makeAction(key)

        result[this.actionTypes[key]] = subState[subsKey][key]
        return result
      }, {})

      subsResult[subsKey] = makeReducer(this.initialState[subsKey], modifiedParts)
      return subsResult
    }, {})

    if(Object.keys(subReducers).length) {
      this.reducer = subReducers
    }
    else {
      this.reducer = () => this.initialState
    }

  }

}
