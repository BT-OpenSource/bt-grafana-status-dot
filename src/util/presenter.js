import _ from 'lodash'

export class Presenter {
  constructor (options) {
    this.options = options
  }

  call (dots) {
    dots.forEach(dot => (dot.color = this._colorFor(dot.colorValue)))
  }

  _colorFor (value) {
    var thresholds = this.options.thresholds.concat().sort((a, b) => b.value - a.value)
    var threshold = _.find(thresholds, (threshold) => value >= threshold.value)
    return threshold ? threshold.color : this.options.defaultColor
  }
}
