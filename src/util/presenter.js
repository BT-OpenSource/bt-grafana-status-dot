import _ from 'lodash'

export class Presenter {
  constructor (options) {
    this.options = options
  }

  call (dots) {
    dots.forEach(dot => this._render(dot))
  }

  _render (dot) {
    dot.percentChange = this._percentChangeFor(dot)
    dot.color = this._colorFor(dot.percentChange)
  }

  _colorFor (percentChange) {
    var thresholds = this.options.thresholds.concat().sort((a, b) => b.value - a.value)
    var threshold = _.find(thresholds, (threshold) => percentChange >= threshold.value)
    return threshold ? threshold.color : this.options.defaultColor
  }

  _percentChangeFor (dot) {
    var change = dot.latestValue - dot.oldestValue
    return (change / dot.oldestValue) * 100
  }
}
