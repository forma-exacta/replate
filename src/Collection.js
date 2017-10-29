import State from './State'
import uuidv4 from 'uuid/v4'

export default class Collection extends State {

  constructor(name, initialState, subState) {
    super(name, initialState, {
      byId: new State('byId', {}, {
        upsert: (state, action) => {
          action.payload._id = action.payload._id || uuidv4()

          return {
            ...state,
            [action.payload._id]: action.payload
          }
        },
        remove: (state, action) => {
          let newState = {...state}
          delete newState[action.payload._id]
          return newState
        }
      }),
      allIds: new State('allIds', [], {
        upsert: (state, action) => {
          if(state.includes(action.payload._id))
            return state

          let newState = state.slice()
          newState.push(action.payload._id)
          return newState
        },
        remove: (state, action) => {
          let newState = state.slice();
          newState.splice(newState.indexOf(action.payload._id), 1)
          return newState
        }
      }),
      ...subState
    })
  }

}
