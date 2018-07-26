'use strict';

var _AbstractState = require('./AbstractState');

var _AbstractState2 = _interopRequireDefault(_AbstractState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('AbstractState', function () {

  it('sets name to value passed in constructor', function () {
    expect(new _AbstractState2.default('test').name).toEqual('test');
  });

  it('sets initial state passed in constructor', function () {
    expect(new _AbstractState2.default('test', { initial: 'state' }).initialState).toEqual({ initial: 'state' });
  });

  it('makes action types with {underscored stateName}:{underscored action name} format', function () {
    var state = new _AbstractState2.default('stateName');
    state.makeActionType('actionName');

    expect(state.actionTypes.actionName).toEqual('STATE_NAME:ACTION_NAME');
  });

  it('makes actions that return corresponding type and payload', function () {
    var state = new _AbstractState2.default('stateName');
    state.makeActionType('actionName');
    state.makeAction('actionName');

    expect(state.actions.actionName({ test: 'payload' })).toEqual({
      type: 'STATE_NAME:ACTION_NAME',
      payload: { test: 'payload' }
    });
  });
});
//# sourceMappingURL=AbstractState.test.js.map