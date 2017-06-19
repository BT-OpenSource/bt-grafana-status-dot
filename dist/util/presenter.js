'use strict';

System.register(['lodash'], function (_export, _context) {
  "use strict";

  var _, _createClass, Presenter;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('Presenter', Presenter = function () {
        function Presenter(options) {
          _classCallCheck(this, Presenter);

          this.options = options;
        }

        _createClass(Presenter, [{
          key: 'call',
          value: function call(dots) {
            var _this = this;

            dots.forEach(function (dot) {
              return dot.color = _this._colorFor(dot.colorValue);
            });
          }
        }, {
          key: '_colorFor',
          value: function _colorFor(value) {
            var thresholds = this.options.thresholds.concat().sort(function (a, b) {
              return b.value - a.value;
            });
            var threshold = _.find(thresholds, function (threshold) {
              return value >= threshold.value;
            });
            return threshold ? threshold.color : this.options.defaultColor;
          }
        }]);

        return Presenter;
      }());

      _export('Presenter', Presenter);
    }
  };
});
//# sourceMappingURL=presenter.js.map
