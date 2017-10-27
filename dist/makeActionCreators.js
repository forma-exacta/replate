'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCRUDActionCreators = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _makeActionTypes = require('./makeActionTypes');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeCRUDActionCreators = exports.makeCRUDActionCreators = function makeCRUDActionCreators(domainName) {

  var actionCreators = {
    create: function create(payload) {
      return {
        payload: _extends({ _id: (0, _v2.default)() }, payload)
      };
    },
    update: function update(id, payload) {
      if (typeof id === 'undefined') {
        throw new Error('id is required for update');
      }

      return {
        payload: _extends({}, payload, { _id: id })
      };
    },
    delete: function _delete(id) {
      if (typeof id === 'undefined') {
        throw new Error('id is required for delete');
      }

      return {
        payload: { _id: id }
      };
    }
  };

  return actionCreators;
};