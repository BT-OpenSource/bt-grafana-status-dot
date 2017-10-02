'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Builder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math = require('../external/math.min');

var math = _interopRequireWildcard(_math);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Builder = exports.Builder = function () {
  function Builder(panel) {
    _classCallCheck(this, Builder);

    this.panel = panel;
  }

  _createClass(Builder, [{
    key: 'call',
    value: function call() {
      var seriesList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return seriesList.map(this._eval, this);
    }
  }, {
    key: '_eval',
    value: function _eval(series) {
      var scratchPadExp = this.panel.mathScratchPad;
      var displayValueExp = this.panel.mathDisplayValue;
      var colorValueExp = this.panel.mathColorValue;
      var scope = { data: this._toValues(series) };

      return { name: series.target,
        scratchPad: math.eval(scratchPadExp, scope),
        displayValue: math.eval(displayValueExp, scope),
        colorValue: math.eval(colorValueExp, scope) };
    }
  }, {
    key: '_toValues',
    value: function _toValues(series) {
      var points = series.datapoints.map(function (point) {
        return point[0];
      });
      return points.filter(function (value) {
        return value != null;
      });
    }
  }]);

  return Builder;
}();
