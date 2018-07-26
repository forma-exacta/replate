'use strict';

var _Collection = require('./Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _makeActionTypes = require('./makeActionTypes');

var _redux = require('redux');

var _State = require('./State');

var _State2 = _interopRequireDefault(_State);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Collection', function () {

  it('generates types, actions, and reducer', function () {
    var state = new _Collection2.default('CollectionTest');

    expect(state.actionTypes).toEqual({
      upsert: (0, _makeActionTypes.makeActionTypeFromActionName)('CollectionTest', 'upsert'),
      remove: (0, _makeActionTypes.makeActionTypeFromActionName)('CollectionTest', 'remove')
    });
    expect(state.actions).toEqual({
      upsert: expect.any(Function),
      remove: expect.any(Function)
    });
    expect((0, _redux.combineReducers)(state.reducer)).toEqual(expect.any(Function));
  });

  it('sets default state', function () {
    var state = new _Collection2.default('CollectionTest');

    expect((0, _redux.combineReducers)(state.reducer)(undefined, {})).toEqual({ byId: {}, allIds: [] });
  });

  it('::upsert inserts a new element with an id', function () {

    var state = new _Collection2.default('CollectionTest');
    var action = state.actions.upsert({ name: 'test' });
    var newState = (0, _redux.combineReducers)(state.reducer)(undefined, action);

    expect(newState.allIds.length).toBe(1);
    var id = newState.allIds[0];
    expect(newState.byId[id]).toEqual({ _id: id, name: 'test' });
  });

  it('::upsert updates an existing element', function () {

    var state = new _Collection2.default('CollectionTest');
    var initialState = {
      byId: { 1: { _id: 1, upsert: 'test' } },
      allIds: [1]
    };
    var action = state.actions.upsert({ _id: 1, add: 'new property' });
    var newState = (0, _redux.combineReducers)(state.reducer)(initialState, action);

    expect(newState.allIds.length).toBe(1);
    expect(newState.byId[1]).toEqual({ _id: 1, add: 'new property' });
  });

  it('::delete removes an existing element', function () {

    var state = new _Collection2.default('CollectionTest');
    var initialState = {
      byId: { 1: { _id: 1, upsert: 'test' } },
      allIds: [1]
    };
    var action = state.actions.remove({ _id: 1 });
    var newState = (0, _redux.combineReducers)(state.reducer)(initialState, action);

    expect(newState.allIds.length).toBe(0);
    expect(newState.byId[1]).not.toBeDefined();
  });

  it('accepts additional substate', function () {
    var state = new _Collection2.default('CollectionTest', {
      another: new _State2.default('another', null, {
        testAction: function testAction() {
          return {};
        }
      })
    });

    expect(state.actionTypes.testAction).toBeDefined();
    expect(state.actions.testAction).toEqual(expect.any(Function));
  });

  it('::upsert accepts arrays', function () {

    var state = new _Collection2.default('CollectionTest');
    var action = state.actions.upsert([{ _id: 1, name: 'test' }, { _id: 2, name: 'test' }]);
    var newState = (0, _redux.combineReducers)(state.reducer)(undefined, action);

    expect(newState.allIds.length).toBe(2);
    var id1 = newState.allIds[0];
    var id2 = newState.allIds[1];
    expect(newState.byId[id1]).toEqual({ _id: id1, name: 'test' });
    expect(newState.byId[id2]).toEqual({ _id: id2, name: 'test' });
  });
}); // I probably shouldn't do this, but f it
//# sourceMappingURL=Collection.test.js.map