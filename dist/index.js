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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Duck2 = require('./Duck');

var _Duck3 = _interopRequireDefault(_Duck2);

var _makeActionTypes = require('./makeActionTypes');

var _makeActionCreators = require('./makeActionCreators');

var _makeReducers = require('./makeReducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DuckCollection = function (_Duck) {
  _inherits(DuckCollection, _Duck);

  function DuckCollection(domainName) {
    _classCallCheck(this, DuckCollection);

    var _this = _possibleConstructorReturn(this, (DuckCollection.__proto__ || Object.getPrototypeOf(DuckCollection)).call(this, domainName, _makeActionTypes.crudPartials));

    _this.setActions((0, _makeActionCreators.makeCRUDActionCreators)(domainName), { addActionType: true });
    _this.setReducers((0, _makeReducers.makeCRUDReducers)(domainName), { addAction: false });
    return _this;
  }

  return DuckCollection;
}(_Duck3.default);

exports.default = DuckCollection;
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var crudPartials = exports.crudPartials = ['CREATE', 'UPDATE', 'DELETE'];

var makeActionType = exports.makeActionType = function makeActionType(domainName, partial) {
  return domainName.toUpperCase() + ':' + partial.toUpperCase();
};

var makeActionTypeFromActionName = exports.makeActionTypeFromActionName = function makeActionTypeFromActionName(domainName, actionName) {
  var underscored = actionName.replace(/([a-z]+)([A-Z0-9]+)/g, '$1_$2');
  underscored = underscored.replace(/([A-Z0-9]{2,})([a-z]+)/g, function ($1, $2, $3) {
    return $2.substring(0, $2.length - 1) + '_' + $2.substring($2.length - 1) + $3;
  });
  underscored = underscored.toUpperCase();
  return makeActionType(domainName, underscored);
};

var makeActionTypesFromActions = exports.makeActionTypesFromActions = function makeActionTypesFromActions(domainName, actions) {
  return Object.keys(actions).reduce(function (result, actionName) {
    return _extends({}, result, _defineProperty({}, actionName, makeActionTypeFromActionName(domainName, actionName)));
  }, {});
};

var makeCRUDActionTypes = exports.makeCRUDActionTypes = function makeCRUDActionTypes(domainName) {
  return makeActionTypes(domainName, crudPartials);
};

var makeActionTypes = function makeActionTypes(domainName, partials) {
  partials = partials || crudPartials;

  return partials.reduce(function (result, partial) {
    result[partial.toUpperCase()] = makeActionType(domainName, partial);
    return result;
  }, {});
};

exports.default = makeActionTypes;
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
