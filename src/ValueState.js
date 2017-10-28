import State from './State'
import {makeReducer} from './makeReducer'

export default class ValueState extends State {

  constructor(name, initialState, reducerParts= {}) {
    super(name, initialState)

    const modifiedParts = Object.keys(reducerParts).reduce((result, key) => {
      this.makeActionType(key)
      this.makeAction(key)

      result[this.actionTypes[key]] = reducerParts[key]
      return result
    }, {})

    this.reducer = makeReducer(this.initialState, modifiedParts)

  }

}
