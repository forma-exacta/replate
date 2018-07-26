'use strict';

var _makeActionTypes = require('./makeActionTypes');

var _makeActionTypes2 = _interopRequireDefault(_makeActionTypes);

var _globalOptions = require('./globalOptions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('makeActionTypes', function () {

  it('- makeActionType concatenates partial and domain name', function () {
    expect((0, _makeActionTypes.makeActionType)('DOMAIN', 'PARTIAL')).toEqual('DOMAIN:PARTIAL');
  });

  it('- makeActionType converts domain and partial to upperCase', function () {
    expect((0, _makeActionTypes.makeActionType)('domain', 'partial')).toEqual('DOMAIN:PARTIAL');
  });

  it(':: makeActionType uses namespace', function () {
    (0, _globalOptions.setOption)('namespace', 'com.forma');
    expect((0, _makeActionTypes.makeActionType)('domain', 'partial')).toEqual('com.forma.DOMAIN:PARTIAL');
    (0, _globalOptions.setOption)('namespace');
  });

  it('generates all actionTypes for domain name', function () {
    var partials = ['P1', 'P2'];
    var domainName = 'TEST1';

    expect((0, _makeActionTypes2.default)(domainName, partials)).toEqual(partials.reduce(function (result, partial) {
      result[partial] = (0, _makeActionTypes.makeActionType)(domainName, partial);
      return result;
    }, {}));
  });

  it('converts domainName to upperCase', function () {
    var partials = ['P1', 'P2'];
    var domainName = 'test_upper';

    // touppercase
    expect((0, _makeActionTypes2.default)(domainName, partials)).toEqual(partials.reduce(function (result, partial) {
      var value = domainName.toUpperCase() + ':' + partial;
      result[partial] = value;
      return result;
    }, {}));
  });

  it('converts partials to upperCase', function () {
    var partials = ['p1', 'p2'];
    var domainName = 'TEST_PARTIAL_UPPER';

    // touppercase
    expect((0, _makeActionTypes2.default)(domainName, partials)).toEqual(partials.reduce(function (result, partial) {
      var value = domainName + ':' + partial.toUpperCase();
      result[partial.toUpperCase()] = value;
      return result;
    }, {}));
  });

  it('makeActionTypeFromActionName underscores and uppercases', function () {
    expect((0, _makeActionTypes.makeActionTypeFromActionName)('domain', 'theActionName')).toEqual('DOMAIN:THE_ACTION_NAME');
    expect((0, _makeActionTypes.makeActionTypeFromActionName)('domain', 'action')).toEqual('DOMAIN:ACTION');
    expect((0, _makeActionTypes.makeActionTypeFromActionName)('domain', 'theActionName123')).toEqual('DOMAIN:THE_ACTION_NAME_123');
    expect((0, _makeActionTypes.makeActionTypeFromActionName)('domain', 'maybeAtrickyOne')).toEqual('DOMAIN:MAYBE_ATRICKY_ONE');
    expect((0, _makeActionTypes.makeActionTypeFromActionName)('domain', 'maybeATrickyOne')).toEqual('DOMAIN:MAYBE_A_TRICKY_ONE');
    expect((0, _makeActionTypes.makeActionTypeFromActionName)('domainName', 'theActionUPPERName')).toEqual('DOMAIN_NAME:THE_ACTION_UPPER_NAME');
    expect((0, _makeActionTypes.makeActionTypeFromActionName)('domain', 'CAPSName')).toEqual('DOMAIN:CAPS_NAME');
  });

  it('makeActionTypesFromActions converts all action names', function () {
    expect((0, _makeActionTypes.makeActionTypesFromActions)('domain', {
      theActionName: function theActionName() {},
      action: function action() {},
      theActionName123: function theActionName123() {},
      maybeAtrickyOne: function maybeAtrickyOne() {},
      maybeATrickyOne: function maybeATrickyOne() {},
      theActionUPPERName: function theActionUPPERName() {},
      CAPSName: function CAPSName() {}
    })).toEqual({
      theActionName: 'DOMAIN:THE_ACTION_NAME',
      action: 'DOMAIN:ACTION',
      theActionName123: 'DOMAIN:THE_ACTION_NAME_123',
      maybeAtrickyOne: 'DOMAIN:MAYBE_ATRICKY_ONE',
      maybeATrickyOne: 'DOMAIN:MAYBE_A_TRICKY_ONE',
      theActionUPPERName: 'DOMAIN:THE_ACTION_UPPER_NAME',
      CAPSName: 'DOMAIN:CAPS_NAME'
    });
  });
});
//# sourceMappingURL=makeActionTypes.test.js.map