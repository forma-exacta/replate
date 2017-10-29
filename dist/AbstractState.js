'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _makeActionTypes = require('./makeActionTypes');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractState = function () {
  function AbstractState(name, initialState) {
    var reducerParts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, AbstractState);

    this.name = name;
    this.initialState = initialState;
    this.reducerParts = reducerParts;
    this.actionTypes = {};
    this.actions = {};
  }

  _createClass(AbstractState, [{
    key: 'makeActionType',
    value: function makeActionType(actionName) {
      this.actionTypes[actionName] = (0, _makeActionTypes.makeActionTypeFromActionName)(this.name, actionName);
    }
  }, {
    key: 'makeAction',
    value: function makeAction(actionName) {
      var _this = this;

      this.actions[actionName] = function (payload) {
        return {
          type: _this.actionTypes[actionName],
          payload: payload
        };
      };
    }
  }]);

  return AbstractState;
}();

exports.default = AbstractState;
//# sourceMappingURL=AbstractState.js.map