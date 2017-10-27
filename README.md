# replate

1. [What is replate?](#1-what-is-replate)
2. [Installation](#2-installation)
3. [Usage](#3-usage)

## 1. What is replate?
A collection of utilities aimed at reducing redux boilerplate. At *forma*, we found ourselves repeating specific patterns in redux, so we created a module to speed development.

replate exposes `Duck`s, which are self-contained state modules that ease the creation of action types, action creators, and reducers. In most circumstances, we find that `Duck`s help manage state, but they narrow your access to redux directly, so they can get in the way too. In other words, they're not always a good thing. You should have a good handle on vanilla redux before using this package, so you know when to effectively apply it.

## 2. Installation
```
npm install replate
```

## 3. Usage

### Duck
`Duck`s are self-contained state modules that help generate action types, action creators, and reducers.

#### Example
```
const
```

### DuckCollection
A `DuckCollection` is a `Duck` that includes actions and reducers for creating normalized collections.
