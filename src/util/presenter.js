import _ from 'lodash'

export class Presenter {
  constructor (panel, kbn) {
    this.panel = panel
    this.kbn = kbn
  }

  call (dots) {
    dots.forEach(dot => (dot.color = this._color(dot.colorValue)))
    dots.forEach(dot => (dot.tooltip = this._tooltip(dot)))
  }

  _tooltip (dot) {
    return dot.name + '<br>' + this._format(dot.displayValue)
  }

  _color (value) {
    var thresholds = _.sortBy(this.panel.thresholds, 'value')
    var threshold = _.find(_.reverse(thresholds), (t) => value >= t.value)
    return threshold ? threshold.color : this.panel.defaultColor
  }

  _format (value) {
    var formatFunc = this.kbn.valueFormats[this.panel.format]
    return formatFunc(value, this.panel.decimals, null)
  }
}
