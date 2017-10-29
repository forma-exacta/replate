'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AbstractState2 = require('./AbstractState');

var _AbstractState3 = _interopRequireDefault(_AbstractState2);

var _makeReducer = require('./makeReducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var State = function (_AbstractState) {
  _inherits(State, _AbstractState);

  function State(name, initialState) {
    var reducerParts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, State);

    var _this = _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).call(this, name, initialState, reducerParts));

    _this.init();
    return _this;
  }

  _createClass(State, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var reducerKeys = Object.keys(this.reducerParts);
      if (reducerKeys.length < 1) {
        this.reducer = function () {
          return _this2.initialState;
        }; // don't know why you want static state, but there you go
      } else if (this.reducerParts[reducerKeys[0]] instanceof _AbstractState3.default) {
        // 'Nested' State
        this.reducer = this.makeSubState(this.reducerParts);
      } else {
        // 'Value' State
        this.reducer = (0, _makeReducer.makeReducer)(this.initialState, this.makeReducerMap(this.reducerParts));
      }
    }
  }, {
    key: 'reinit',
    value: function reinit() {
      this.actionTypes = {};
      this.actions = {};
      this.reducer = undefined;
      this.init();
    }
  }, {
    key: 'makeReducerMap',
    value: function makeReducerMap(reducerParts) {
      var _this3 = this;

      return Object.keys(reducerParts).reduce(function (result, key) {
        _this3.makeActionType(key);
        _this3.makeAction(key);

        result[_this3.actionTypes[key]] = reducerParts[key];
        return result;
      }, {});
    }
  }, {
    key: 'makeSubState',
    value: function makeSubState(reducerParts) {
      var _this4 = this;

      return Object.keys(reducerParts).reduce(function (result, key) {
        var subState = reducerParts[key];
        subState.name = _this4.name;
        subState.reinit();
        Object.assign(_this4.actionTypes, subState.actionTypes);
        Object.assign(_this4.actions, subState.actions);

        result[key] = subState.reducer;
        return result;
      }, {});
    }
  }]);

  return State;
}(_AbstractState3.default);

exports.default = State;
//# sourceMappingURL=State.js.map