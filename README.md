# replate

1. [What is replate?](#1-what-is-replate)
2. [Installation](#2-installation)
3. [Usage](#3-usage)

## 1. What is replate?
Replate was designed to reduce redux boilerplate. Several different `State` classes generate actions and reducers for you, when it makes sense. Replate provides a simple `ValueState` that has only one reducer, or a `ComplexState` that can handle state with nested reducers. A `Collection` class for normalized collections is also provided.

#### Example: 'Value' State
**Constructor**
```javascript
const valueState = new State('counter', 0, {
  set: (state, action) => action.payload,
  inc: (state, action) => state + 1,
  dec: (state, action) => state - 1
})
```

**Action Types**
```javascript
expect(valueState.actionTypes.set).toEqual('COUNTER:SET')
expect(valueState.actionTypes.inc).toEqual('COUNTER:INC')
expect(valueState.actionTypes.dec).toEqual('COUNTER:DEC')
```

**Action Creators**
```javascript
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
```

**Reducers**
```javascript
expect(valueState.reducer(undefined, {})).toEqual(0) // default value
expect(valueState.reducer(undefined, setAction)).toEqual(10)
expect(valueState.reducer(10, incAction)).toEqual(11)
expect(valueState.reducer(11, decAction)).toEqual(10)
```

---

## 2. Installation
```
npm install replate
```

---

## 3. Usage

### State
Some description of State

##### constructor
> new ValueState(*stateName*[, *defaultValue*, *reducerMap*])

| parameter | description | default value |
| --- | --- | --- |
| stateName | The name of the state. This will be converted to upper snake case and prepended to any action type names |  |
| defaultValue | The default state value | null |
| reducerMap | A map with action names as keys and reducers as values | {} |

### Collection

### Action Type Naming

##### Namespace
