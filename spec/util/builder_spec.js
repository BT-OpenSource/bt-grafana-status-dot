import {Builder} from '../../src/util/builder'

describe('Builder', function () {
  beforeEach(function () {
    this.subject = new Builder({})
  })

  describe('call', function () {
    it('builds a dot summarising each of the series', function () {
      var seriesList = [
        { target: 'a', datapoints: [[1, 'ts'], [2, 'ts']] }
      ]

      var expected = { name: 'a', oldestValue: 1, latestValue: 2 }
      expect(this.subject.call(seriesList)).toEqual([expected])
    })

    it('copes with null values within the series', function () {
      var seriesList = [
        { target: 'a', datapoints: [[null, 'ts'], [1, 'ts']] },
        { target: 'b', datapoints: [[1, 'ts'], [null, 'ts']] },
        { target: 'c', datapoints: [[null, 'ts'], [null, 'ts']] }
      ]

      var expected = [
        { name: 'a', oldestValue: 1, latestValue: 1 },
        { name: 'b', oldestValue: 1, latestValue: 1 },
        { name: 'c', oldestValue: null, latestValue: null }
      ]

      expect(this.subject.call(seriesList)).toEqual(expected)
    })
  })
})
