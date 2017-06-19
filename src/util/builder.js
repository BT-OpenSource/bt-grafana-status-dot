import * as math from '../external/math.min'

export class Builder {
  constructor (options) {
    this.options = options
  }

  call (seriesList = []) {
    return seriesList.map(this._eval, this)
  }

  _eval (series) {
    var scratchPadExp = this.options.mathScratchPad
    var displayValueExp = this.options.mathDisplayValue
    var colorValueExp = this.options.mathColorValue
    var scope = { data: this._toValues(series) }

    return { name: series.target,
      scratchPad: math.eval(scratchPadExp, scope),
      displayValue: math.eval(displayValueExp, scope),
      colorValue: math.eval(colorValueExp, scope) }
  }

  _toValues (series) {
    var points = series.datapoints.map(point => point[0])
    return points.filter(value => value != null)
  }
}
