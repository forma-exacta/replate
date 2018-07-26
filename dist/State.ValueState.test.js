'use strict';

var _State = require('./State');

var _State2 = _interopRequireDefault(_State);

var _makeActionTypes = require('./makeActionTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('State', function () {

  it('generates types, actions, and reducer', function () {
    var state = new _State2.default('State', null, {
      set: function set() {
        return action.payload;
      },
      inc: function inc() {
        return state + action.payload;
      }
    });

    expect(state.actionTypes).toEqual({
      set: (0, _makeActionTypes.makeActionTypeFromActionName)('State', 'set'),
      inc: (0, _makeActionTypes.makeActionTypeFromActionName)('State', 'inc')
    });
    expect(state.actions).toEqual({
      set: expect.any(Function),
      inc: expect.any(Function)
    });
    expect(state.reducer).toEqual(expect.any(Function));
  });

  it('sets default state', function () {
    var state = new _State2.default('State', 'defaultState');

    expect(state.reducer(undefined, {})).toEqual('defaultState');
  });

  it('reducer responds to all action types', function () {
    var state = new _State2.default('State', null, {
      set: function set(state, action) {
        return action.payload;
      },
      inc: function inc(state, action) {
        return state + action.payload;
      }
    });

    expect(state.reducer(null, { type: state.actionTypes.set, payload: 1 })).toEqual(1);
    expect(state.reducer(1, { type: state.actionTypes.inc, payload: 2 })).toEqual(3);
  });
});
//# sourceMappingURL=State.ValueState.test.js.map