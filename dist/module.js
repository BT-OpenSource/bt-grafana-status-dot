'use strict';

System.register(['./module.css!', 'lodash', 'app/core/utils/kbn', 'app/plugins/sdk', './util/builder', './util/presenter', './util/linker'], function (_export, _context) {
  "use strict";

  var _, kbn, MetricsPanelCtrl, Builder, Presenter, Linker, _createClass, panelDefaults, StatusDotCtrl;

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
    }, function (_utilLinker) {
      Linker = _utilLinker.Linker;
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
        linkIndex: 0,
        linkVars: [],
        format: 'none',
        decimals: 2,
        mathScratchPad: 'data = size(data)[1] == 0 ? [NaN] : data',
        mathDisplayValue: 'data[end]',
        mathColorValue: 'data[end]'
      };

      _export('PanelCtrl', _export('StatusDotCtrl', StatusDotCtrl = function (_MetricsPanelCtrl) {
        _inherits(StatusDotCtrl, _MetricsPanelCtrl);

        function StatusDotCtrl($scope, $injector, linkSrv) {
          _classCallCheck(this, StatusDotCtrl);

          var _this = _possibleConstructorReturn(this, (StatusDotCtrl.__proto__ || Object.getPrototypeOf(StatusDotCtrl)).call(this, $scope, $injector));

          _.defaults(_this.panel, panelDefaults);

          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
          _this.events.on('data-received', _this.onDataReceived.bind(_this));
          _this.events.on('render', _this.onRender.bind(_this));

          _this.builder = new Builder(_this.panel);
          _this.presenter = new Presenter(_this.panel);
          _this.linker = new Linker(_this.panel, linkSrv);
          return _this;
        }

        _createClass(StatusDotCtrl, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.addEditorTab('Options', 'public/plugins/btplc-status-dot-panel/editor.html');
            this.addEditorTab('Values', 'public/plugins/btplc-status-dot-panel/values.html');
            this.addEditorTab('Links', 'public/plugins/btplc-status-dot-panel/links.html');
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
            this.linker.call(this.dots);
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
          key: 'onEditorAddLinkVar',
          value: function onEditorAddLinkVar() {
            this.panel.linkVars.push({ name: 'myvar', index: '0' });
            this.render();
          }
        }, {
          key: 'onEditorRemoveLinkVar',
          value: function onEditorRemoveLinkVar(index) {
            this.panel.linkVars.splice(index, 1);
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
            var formatFunc = kbn.valueFormats[this.panel.format];
            return formatFunc(value, this.panel.decimals, null);
          }
        }]);

        return StatusDotCtrl;
      }(MetricsPanelCtrl)));

      _export('StatusDotCtrl', StatusDotCtrl);

      StatusDotCtrl.templateUrl = 'module.html';

      _export('PanelCtrl', StatusDotCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
