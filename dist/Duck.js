'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _redux = require('redux');

var _makeActionTypes = require('./makeActionTypes');

var _makeActionTypes2 = _interopRequireDefault(_makeActionTypes);

var _makeReducers = require('./makeReducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var addActionOptions = {
  addActionType: true
};

var addReducerOptions = {
  addAction: true
};

var Duck = function () {
  function Duck(domainName) {
    _classCallCheck(this, Duck);

    this._domainName = domainName;
    this._actionTypes = {};
    this._actions = {};
    this._reducers = {};
    this._reducer = function () {};
  }

  _createClass(Duck, [{
    key: 'addAction',
    value: function addAction(actionName, action, options) {
      options = _extends({}, addActionOptions, options);

      if (options.addActionType) {
        var actionType = (0, _makeActionTypes.makeActionTypeFromActionName)(this._domainName, actionName);
        this._actionTypes[actionName] = actionType;
        this._actions[actionName] = function () {
          return _extends({
            type: actionType
          }, action.apply(undefined, arguments));
        };
      } else {
        this._actions[actionName] = action;
      }
    }
  }, {
    key: 'addReducer',
    value: function addReducer(reducerName, reducer, options) {
      options = _extends({}, addReducerOptions, options);

      if (options.addAction) {
        this.addAction(reducerName, function (payload) {
          return { payload: payload };
        }, { addActionType: true });
        this._reducers[reducerName] = (0, _makeReducers.makeReducer)(options.initialState || null, _defineProperty({}, this._actionTypes[reducerName], function (state, action) {
          return reducer(state, action);
        }));
      } else {
        this._reducers[reducerName] = reducer;
      }
      this._reducer = (0, _redux.combineReducers)(this._reducers);
    }
  }, {
    key: 'setActions',
    value: function setActions(actions, options) {
      var _this = this;

      this._actions = {};
      Object.keys(actions).forEach(function (actionName) {
        return _this.addAction(actionName, actions[actionName], options);
      });
    }
  }, {
    key: 'setReducers',
    value: function setReducers(reducers, options) {
      var _this2 = this;

      this._reducers = {};
      Object.keys(reducers).forEach(function (reducerName) {
        return _this2.addReducer(reducerName, reducers[reducerName], options);
      });
    }
  }, {
    key: 'domainName',
    get: function get() {
      return this._domainName;
    }
  }, {
    key: 'actionTypes',
    get: function get() {
      return this._actionTypes;
    }
  }, {
    key: 'actions',
    get: function get() {
      return this._actions;
    }
  }, {
    key: 'reducers',
    get: function get() {
      return this._reducers;
    }
  }, {
    key: 'reducer',
    get: function get() {
      return this._reducer;
    }
  }]);

  return Duck;
}();

exports.default = Duck;
//# sourceMappingURL=Duck.js.map