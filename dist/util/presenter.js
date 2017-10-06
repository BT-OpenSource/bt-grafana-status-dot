'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Presenter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Presenter = exports.Presenter = function () {
  function Presenter(panel, kbn) {
    _classCallCheck(this, Presenter);

    this.panel = panel;
    this.kbn = kbn;
  }

  _createClass(Presenter, [{
    key: 'call',
    value: function call(dots) {
      var _this = this;

      dots.forEach(function (dot) {
        return dot.color = _this._color(dot.colorValue);
      });
      dots.forEach(function (dot) {
        return dot.tooltip = _this._tooltip(dot);
      });
    }
  }, {
    key: '_tooltip',
    value: function _tooltip(dot) {
      return dot.name + '<br>' + this._format(dot.displayValue);
    }
  }, {
    key: '_color',
    value: function _color(value) {
      var _this2 = this;

      var ts = _lodash2.default.sortBy(this.panel.thresholds, function (t) {
        return _this2._value(t);
      });
      var threshold = _lodash2.default.find(_lodash2.default.reverse(ts), function (t) {
        return value >= _this2._value(t);
      });
      return threshold ? threshold.color : this.panel.defaultColor;
    }
  }, {
    key: '_format',
    value: function _format(value) {
      var formatFunc = this.kbn.valueFormats[this.panel.format];
      return formatFunc(value, this.panel.decimals, null);
    }
  }, {
    key: '_value',
    value: function _value(threshold) {
      return parseFloat(threshold.value);
    }
  }]);

  return Presenter;
}();
