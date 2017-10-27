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
//# sourceMappingURL=DuckCollection.js.map