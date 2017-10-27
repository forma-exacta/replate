'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCRUDReducers = exports.makeReducer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _makeActionTypes = require('./makeActionTypes');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var makeReducer = exports.makeReducer = function makeReducer(initialState, handlers) {
  return function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

var makeCRUDReducers = exports.makeCRUDReducers = function makeCRUDReducers(domainName) {
  var _makeReducer, _makeReducer2;

  var actionTypes = (0, _makeActionTypes.makeCRUDActionTypes)(domainName);

  var byId = makeReducer({}, (_makeReducer = {}, _defineProperty(_makeReducer, actionTypes.CREATE, function (state, action) {
    return _extends({}, state, _defineProperty({}, action.payload._id, action.payload));
  }), _defineProperty(_makeReducer, actionTypes.UPDATE, function (state, action) {
    return _extends({}, state, _defineProperty({}, action.payload._id, action.payload));
  }), _defineProperty(_makeReducer, actionTypes.DELETE, function (state, action) {
    var newState = _extends({}, state);
    delete newState[action.payload._id];
    return newState;
  }), _makeReducer));

  var allIds = makeReducer([], (_makeReducer2 = {}, _defineProperty(_makeReducer2, actionTypes.CREATE, function (state, action) {
    var newState = state.slice();
    newState.push(action.payload._id);
    return newState;
  }), _defineProperty(_makeReducer2, actionTypes.DELETE, function (state, action) {
    var newState = state.slice();
    newState.splice(newState.indexOf(action.payload._id), 1);
    return newState;
  }), _makeReducer2));

  return { byId: byId, allIds: allIds };
};