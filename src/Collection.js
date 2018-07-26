import State from './State'
import uuidv4 from 'uuid/v4'

export default class Collection extends State {

  constructor(name, subState) {
    super(name, {}, {
      byId: new State('byId', {}, {
        upsert: (state, action) => {
          let newState = {}

          if(Array.isArray(action.payload)) {
            newState = action.payload.reduce((res, curr) => {
              curr._id = curr._id || uuidv4()
              return {...res, [curr._id]: curr}
            }, {})
          }
          else {
            action.payload._id = action.payload._id || uuidv4()
            newState = {[action.payload._id]: action.payload}
          }

          return {
            ...state,
            ...newState
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
          if(Array.isArray(action.payload)) {
            state = [...state, ...action.payload.map(val => val._id)]
          }
          else {
            state.push(action.payload._id)
          }

          return state.filter((value, index, self) => self.indexOf(value) === index)
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
