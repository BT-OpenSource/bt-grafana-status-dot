import _ from 'lodash'
import kbn from 'app/core/utils/kbn'
import {MetricsPanelCtrl} from 'app/plugins/sdk'
import {Builder} from './util/builder'
import {Presenter} from './util/presenter'
import {Linker} from './util/linker'
import {Styler} from './util/styler'

const panelDefaults = {
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
}

export class PanelCtrl extends MetricsPanelCtrl {
  constructor ($scope, $injector, linkSrv) {
    super($scope, $injector)
    _.defaults(this.panel, panelDefaults)

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this))
    this.events.on('data-received', this.onDataReceived.bind(this))
    this.events.on('render', this.onRender.bind(this))

    this.builder = new Builder(this.panel)
    this.presenter = new Presenter(this.panel, kbn)
    this.linker = new Linker(this.panel, linkSrv)
    this.styler = new Styler(this.panel)
  }

  onInitEditMode () {
    this.addEditorTab('Options', 'public/plugins/btplc-status-dot-panel/editor.html')
    this.addEditorTab('Values', 'public/plugins/btplc-status-dot-panel/values.html')
    this.addEditorTab('Links', 'public/plugins/btplc-status-dot-panel/links.html')
    this.unitFormats = kbn.getUnitFormats()
  }

  onDataReceived (seriesList) {
    this.seriesList = seriesList
    this.render()
  }

  onRender () {
    this.dots = this.builder.call(this.seriesList)
    this.presenter.call(this.dots)
    this.linker.call(this.dots)
    this.styler.call(this.dots)
  }

  onEditorSetFormat (subitem) {
    this.panel.format = subitem.value
    this.render()
  }

  onEditorAddThreshold () {
    this.panel.thresholds.push({ color: this.panel.defaultColor })
    this.render()
  }

  onEditorRemoveThreshold (index) {
    this.panel.thresholds.splice(index, 1)
    this.render()
  }

  onEditorAddLinkVar () {
    this.panel.linkVars.push({ name: 'myvar', index: '0' })
    this.render()
  }

  onEditorRemoveLinkVar (index) {
    this.panel.linkVars.splice(index, 1)
    this.render()
  }
}

PanelCtrl.templateUrl = 'module.html'
