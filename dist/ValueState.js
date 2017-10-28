'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _State2 = require('./State');

var _State3 = _interopRequireDefault(_State2);

var _makeReducer = require('./makeReducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ValueState = function (_State) {
  _inherits(ValueState, _State);

  function ValueState(name, initialState) {
    var reducerParts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, ValueState);

    var _this = _possibleConstructorReturn(this, (ValueState.__proto__ || Object.getPrototypeOf(ValueState)).call(this, name, initialState));

    var modifiedParts = Object.keys(reducerParts).reduce(function (result, key) {
      _this.makeActionType(key);
      _this.makeAction(key);

      result[_this.actionTypes[key]] = reducerParts[key];
      return result;
    }, {});

    _this.reducer = (0, _makeReducer.makeReducer)(_this.initialState, modifiedParts);

    return _this;
  }

  return ValueState;
}(_State3.default);

exports.default = ValueState;
//# sourceMappingURL=ValueState.js.map