'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _State2 = require('./State');

var _State3 = _interopRequireDefault(_State2);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Collection = function (_State) {
  _inherits(Collection, _State);

  function Collection(name, subState) {
    _classCallCheck(this, Collection);

    return _possibleConstructorReturn(this, (Collection.__proto__ || Object.getPrototypeOf(Collection)).call(this, name, {}, _extends({
      byId: new _State3.default('byId', {}, {
        upsert: function upsert(state, action) {
          var newState = {};

          if (Array.isArray(action.payload)) {
            newState = action.payload.reduce(function (res, curr) {
              curr._id = curr._id || (0, _v2.default)();
              return _extends({}, res, _defineProperty({}, curr._id, curr));
            }, {});
          } else {
            action.payload._id = action.payload._id || (0, _v2.default)();
            newState = _defineProperty({}, action.payload._id, action.payload);
          }

          return _extends({}, state, newState);
        },
        remove: function remove(state, action) {
          var newState = _extends({}, state);
          delete newState[action.payload._id];
          return newState;
        }
      }),
      allIds: new _State3.default('allIds', [], {
        upsert: function upsert(state, action) {
          if (Array.isArray(action.payload)) {
            state = [].concat(_toConsumableArray(state), _toConsumableArray(action.payload.map(function (val) {
              return val._id;
            })));
          } else {
            state.push(action.payload._id);
          }

          return state.filter(function (value, index, self) {
            return self.indexOf(value) === index;
          });
        },
        remove: function remove(state, action) {
          var newState = state.slice();
          newState.splice(newState.indexOf(action.payload._id), 1);
          return newState;
        }
      })
    }, subState)));
  }

  return Collection;
}(_State3.default);

exports.default = Collection;
//# sourceMappingURL=Collection.js.map