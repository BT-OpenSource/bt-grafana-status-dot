'use strict';

System.register(['./module.css!', 'lodash', 'app/core/utils/kbn', 'app/plugins/sdk', './util/builder', './util/presenter'], function (_export, _context) {
  "use strict";

  var _, kbn, MetricsPanelCtrl, Builder, Presenter, _createClass, panelDefaults, TrendDotCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_moduleCss) {}, function (_lodash) {
      _ = _lodash.default;
    }, function (_appCoreUtilsKbn) {
      kbn = _appCoreUtilsKbn.default;
    }, function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }, function (_utilBuilder) {
      Builder = _utilBuilder.Builder;
    }, function (_utilPresenter) {
      Presenter = _utilPresenter.Presenter;
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

      panelDefaults = {
        radius: '20px',
        defaultColor: 'rgb(117, 117, 117)',
        thresholds: [],
        format: 'none',
        decimals: 2
      };

      _export('PanelCtrl', _export('TrendDotCtrl', TrendDotCtrl = function (_MetricsPanelCtrl) {
        _inherits(TrendDotCtrl, _MetricsPanelCtrl);

        function TrendDotCtrl($scope, $injector) {
          _classCallCheck(this, TrendDotCtrl);

          var _this = _possibleConstructorReturn(this, (TrendDotCtrl.__proto__ || Object.getPrototypeOf(TrendDotCtrl)).call(this, $scope, $injector));

          _.defaults(_this.panel, panelDefaults);

          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
          _this.events.on('data-received', _this.onDataReceived.bind(_this));
          _this.events.on('render', _this.onRender.bind(_this));

          _this.builder = new Builder(_this.panel);
          _this.presenter = new Presenter(_this.panel);
          return _this;
        }

        _createClass(TrendDotCtrl, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.addEditorTab('Options', 'public/plugins/btplc-trend-dot-panel/editor.html');
            this.unitFormats = kbn.getUnitFormats();
          }
        }, {
          key: 'onDataReceived',
          value: function onDataReceived(seriesList) {
            this.seriesList = seriesList;
            this.render();
          }
        }, {
          key: 'onRender',
          value: function onRender() {
            this.dots = this.builder.call(this.seriesList);
            this.presenter.call(this.dots);
          }
        }, {
          key: 'onEditorSetFormat',
          value: function onEditorSetFormat(subitem) {
            this.panel.format = subitem.value;
            this.render();
          }
        }, {
          key: 'onEditorAddThreshold',
          value: function onEditorAddThreshold() {
            this.panel.thresholds.push({ value: 0, color: this.panel.defaultColor });
            this.render();
          }
        }, {
          key: 'onEditorRemoveThreshold',
          value: function onEditorRemoveThreshold(index) {
            this.panel.thresholds.splice(index, 1);
            this.render();
          }
        }, {
          key: 'styleFor',
          value: function styleFor(dot) {
            return { 'background': dot.color, 'width': this.panel.radius, 'height': this.panel.radius };
          }
        }, {
          key: 'format',
          value: function format(value) {
            var _format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.panel.format;

            var formatFunc = kbn.valueFormats[_format];
            return formatFunc(value, this.panel.decimals, null);
          }
        }]);

        return TrendDotCtrl;
      }(MetricsPanelCtrl)));

      _export('TrendDotCtrl', TrendDotCtrl);

      TrendDotCtrl.templateUrl = 'module.html';

      _export('PanelCtrl', TrendDotCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
