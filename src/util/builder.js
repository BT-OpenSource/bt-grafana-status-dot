import _ from 'lodash'

export class Builder {
  constructor (options) {
    this.options = options
  }

  call (seriesList = []) {
    return seriesList.map(series => this._buildDotFor(series))
  }

  _buildDotFor (series) {
    var points = this._cleanup(series)

    return { name: series.target,
      oldestValue: this._oldestValueFor(points),
      latestValue: this._latestValueFor(points) }
  }

  _cleanup (series) {
    return _.filter(series.datapoints, (point) => point[0] != null)
  }

  _oldestValueFor (points) {
    var point = points[0]
    return point ? point[0] : null
  }

  _latestValueFor (points) {
    var point = points[points.length - 1]
    return point ? point[0] : null
  }
}
