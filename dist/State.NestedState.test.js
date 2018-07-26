'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _State = require('./State');

var _State2 = _interopRequireDefault(_State);

var _makeActionTypes = require('./makeActionTypes');

var _redux = require('redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var makeCollectionState = function makeCollectionState() {
  return new _State2.default('State', {}, {
    byId: new _State2.default('byId', {}, {
      add: function add(state, action) {
        return _extends({}, state, _defineProperty({}, action.payload._id, action.payload));
      },
      remove: function remove(state, action) {
        var newState = _extends({}, state);
        delete newState[action.payload._id];
        return newState;
      }
    }),
    allIds: new _State2.default('allIds', [], {
      add: function add(state, action) {
        var newState = state.slice();
        newState.push(action.payload._id);
        return newState;
      },
      remove: function remove(state, action) {
        var newState = state.slice();
        newState.splice(newState.indexOf(action.payload._id), 1);
        return newState;
      }
    })
  });
};

describe('State', function () {

  it('generates types, actions, and reducer', function () {
    var state = makeCollectionState();

    expect(state.actionTypes).toEqual({
      add: (0, _makeActionTypes.makeActionTypeFromActionName)('State', 'add'),
      remove: (0, _makeActionTypes.makeActionTypeFromActionName)('State', 'remove')
    });
    expect(state.actions).toEqual({
      add: expect.any(Function),
      remove: expect.any(Function)
    });
    expect(state.reducer).toEqual({
      byId: expect.any(Function),
      allIds: expect.any(Function)
    });
  });

  it('sets default state', function () {
    var state = makeCollectionState();

    expect((0, _redux.combineReducers)(state.reducer)(undefined, {})).toEqual({ byId: {}, allIds: [] });
  });

  it('reducer responds to all action types', function () {

    var state = makeCollectionState();

    var state1 = {
      byId: { 1: { _id: 1 } },
      allIds: [1]
    };

    expect(state.reducer.byId({}, { type: state.actionTypes.add, payload: { _id: 1 } })).toEqual({ 1: { _id: 1 } });
    expect(state.reducer.byId({ 1: { _id: 1 } }, { type: state.actionTypes.remove, payload: { _id: 1 } })).toEqual({});
    expect(state.reducer.allIds([], { type: state.actionTypes.add, payload: { _id: 1 } })).toEqual([1]);
    expect(state.reducer.allIds([1], { type: state.actionTypes.remove, payload: { _id: 1 } })).toEqual([]);
  });
});
//# sourceMappingURL=State.NestedState.test.js.map