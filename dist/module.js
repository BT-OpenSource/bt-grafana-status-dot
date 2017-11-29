'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelCtrl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _kbn = require('app/core/utils/kbn');

var _kbn2 = _interopRequireDefault(_kbn);

var _sdk = require('app/plugins/sdk');

var _builder = require('./util/builder');

var _presenter = require('./util/presenter');

var _linker = require('./util/linker');

var _styler = require('./util/styler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var panelDefaults = {
  radius: '20px',
  defaultColor: 'rgb(117, 117, 117)',
  thresholds: [],
  linkIndex: '0',
  linkVars: [],
  format: 'none',
  decimals: 2,
  mathScratchPad: 'data = size(data)[1] == 0 ? [NaN] : data',
  mathDisplayValue: 'data[end]',
  mathColorValue: 'data[end]'
};

var PanelCtrl = exports.PanelCtrl = function (_MetricsPanelCtrl) {
  _inherits(PanelCtrl, _MetricsPanelCtrl);

  function PanelCtrl($scope, $injector, linkSrv) {
    _classCallCheck(this, PanelCtrl);

    var _this = _possibleConstructorReturn(this, (PanelCtrl.__proto__ || Object.getPrototypeOf(PanelCtrl)).call(this, $scope, $injector));

    _lodash2.default.defaults(_this.panel, panelDefaults);

    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
    _this.events.on('data-received', _this.onDataReceived.bind(_this));
    _this.events.on('render', _this.onRender.bind(_this));

    _this.builder = new _builder.Builder(_this.panel);
    _this.presenter = new _presenter.Presenter(_this.panel, _kbn2.default);
    _this.linker = new _linker.Linker(_this.panel, linkSrv);
    _this.styler = new _styler.Styler(_this.panel);
    return _this;
  }

  _createClass(PanelCtrl, [{
    key: 'onInitEditMode',
    value: function onInitEditMode() {
      this.addEditorTab('Options', 'public/plugins/btplc-status-dot-panel/editor.html');
      this.addEditorTab('Values', 'public/plugins/btplc-status-dot-panel/values.html');
      this.addEditorTab('Links', 'public/plugins/btplc-status-dot-panel/links.html');
      this.unitFormats = _kbn2.default.getUnitFormats();
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
      this.styler.call(this.dots);
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
      this.panel.thresholds.push({ color: this.panel.defaultColor });
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
  }]);

  return PanelCtrl;
}(_sdk.MetricsPanelCtrl);

PanelCtrl.templateUrl = 'module.html';
