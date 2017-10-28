'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var makeActionType = exports.makeActionType = function makeActionType(domainName, partial) {
  return domainName.toUpperCase() + ':' + partial.toUpperCase();
};

var makeActionTypeFromActionName = exports.makeActionTypeFromActionName = function makeActionTypeFromActionName(domainName, actionName) {
  return makeActionType(underscore(domainName), underscore(actionName));
};

var underscore = exports.underscore = function underscore(string) {
  var underscored = string.replace(/([a-z]+)([A-Z0-9]+)/g, '$1_$2');
  underscored = underscored.replace(/([A-Z0-9]{2,})([a-z]+)/g, function ($1, $2, $3) {
    return $2.substring(0, $2.length - 1) + '_' + $2.substring($2.length - 1) + $3;
  });
  underscored = underscored.toUpperCase();
  return underscored;
};

var makeActionTypesFromActions = exports.makeActionTypesFromActions = function makeActionTypesFromActions(domainName, actions) {
  return Object.keys(actions).reduce(function (result, actionName) {
    return _extends({}, result, _defineProperty({}, actionName, makeActionTypeFromActionName(domainName, actionName)));
  }, {});
};

var makeActionTypes = function makeActionTypes(domainName, partials) {
  partials = partials || crudPartials;

  return partials.reduce(function (result, partial) {
    result[partial.toUpperCase()] = makeActionType(domainName, partial);
    return result;
  }, {});
};

exports.default = makeActionTypes;
//# sourceMappingURL=makeActionTypes.js.map