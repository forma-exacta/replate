# replate

1. [What is replate?](#1-what-is-replate)
2. [Installation](#2-installation)
3. [Usage](#3-usage)

## 1. What is replate?
Replate was designed to reduce redux boilerplate. It offers a `State` class that will generate action types, action creators, and reducers for you, given minimal input.

Replate is not ideal for every type of state your app may require, but it accelerates those that seem to be most common.

#### Example: 'Value' State
When your state is defined by a single reducer, you can use the `Value` state pattern with replate. Give your state a name, a default value, and a map of actions/reducer parts. Replate will generate everything else redux needs.

```javascript
// CONSTRUCTOR
const valueState = new State('counter', 0, {
  set: (state, action) => action.payload,
  inc: (state, action) => state + 1,
  dec: (state, action) => state - 1
})

// ACTION TYPES
expect(valueState.actionTypes.set).toEqual('COUNTER:SET')
expect(valueState.actionTypes.inc).toEqual('COUNTER:INC')
expect(valueState.actionTypes.dec).toEqual('COUNTER:DEC')

// ACTION CREATORS
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

// REDUCER
expect(valueState.reducer(undefined, {})).toEqual(0) // initial state
expect(valueState.reducer(undefined, setAction)).toEqual(10)
expect(valueState.reducer(10, incAction)).toEqual(11)
expect(valueState.reducer(11, decAction)).toEqual(10)
```

#### Example: 'Nested' State
When your state is defined by multiple nested reducers, use the 'Nested' state pattern. Nested reducers are represented by additional `State` instances. These nested `State`s will respond to actions created for the original parent collection. The example below creates a Collection state, which could be reused for normalized collections of state. In fact, replate implements something very similar with the `Collection` class.

```javascript
// CONSTRUCTOR
const collection = new State('Collection', {}, {
  byId: new State('byId', {}, {
    upsert: (state, action) => {
      action.payload._id = action.payload._id

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
  })
})

// ACTION TYPES
expect(collection.actionTypes.upsert).toEqual('COLLECTION:UPSERT')
expect(collection.actionTypes.remove).toEqual('COLLECTION:REMOVE')

// ACTION CREATORS
const upsertAction = collection.actions.upsert({_id: 1, value: 'one'})
expect(upsertAction).toEqual({
  type: collection.actionTypes.upsert,
  payload: {_id: 1, value: 'one'}
})

const removeAction = collection.actions.remove({_id: 1})
expect(removeAction).toEqual({
  type: collection.actionTypes.remove,
  payload: {_id: 1}
})

// REDUCER

// This is a little easier if we combine
const reducer = combineReducers(collection.reducer)

// undefined state and empty action returns initial state
expect(reducer(undefined, {})).toEqual({
  byId: {},
  allIds: []
})

// we're going to want this again, so lets define it here
const nextState = {
  byId: {
    1: {
      _id: 1,
      value: 'one'
    }
  },
  allIds: [1]
}

// upsert and the state includes the new
expect(reducer(undefined, upsertAction)).toEqual(nextState)

// remove the item and we're back to the initial state
expect(reducer(nextState, removeAction)).toEqual({
  byId: {},
  allIds: []
})
```

## 2. Installation
```
npm install replate
```

## 3. Usage

### State
Given a name, initialValue, and a reducerMap, this will generate all of the boilerplate you need to start interacting with your state.

##### constructor
> new ValueState(*stateName*[, *initialValue*, *reducerMap*])

| parameter | description |
| --- | --- | --- |
| stateName | The name of the state. This will be converted to upper snake case and prepended to any action type names |
| initialValue | The default state value |
| reducerMap | Can follow either the 'Value' or 'Nested' state pattern shown in the examples above. |


##### properties
| property | description |
| --- | --- | --- |
| actionTypes | A map of action types. The key is derived from the reducerMap passed into the constructor. The value is a concatenation of the state name and action name. See [Action Type Naming](#action-type-naming) for more details. |
| actions | A map of action names and methods. The method will return an object with the structure `{type, payload}` where payload is whatever you pass into the method. |
| reducer | If you used the 'Value' pattern, a reducer method with signature `reducer(state, action)`. If you used the nested pattern, a map of named reducers. |


### Collection
At forma, we found the normalized state collection to be a fairly common pattern, so we implemented this out of the box. In fact, this was the main motivation for making this library. Instead of implementing the Nested `State` collection from the example above, just instantiate a `Collection`. This provides you with a basic normalized state collection including `byId` and `allIds`

```javascript
const collection = new Collection('screens')

expect(collection.actionTypes.upsert).toEqual('SCREENS:UPSERT')
expect(collection.actionTypes.remove).toEqual('SCREENS:REMOVE')

// ...etc
```

##### constructor
> new ValueState(*stateName*[, *reducerMap*])

| parameter | description |
| --- | --- | --- |
| stateName | The name of the state. This will be converted to upper snake case and prepended to any action type names |
| reducerMap | Nested state in addition to `byId` and `allIds` |

### Action Type Naming
Action types concatenate the `State` name with an action name. Both are converted to upper snake case.

**e.g.**
```javascript
const state = new State('camelCaseName', {}, {
  action1: () => ({})
})

state.actionTypes.action1 // CAMEL_CASE_NAME:ACTION_1
```
