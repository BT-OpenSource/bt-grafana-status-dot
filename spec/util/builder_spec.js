import {Builder} from '../../src/util/builder'

describe('Builder', function () {
  beforeEach(function () {
    this.subject = new Builder({
      mathScratchPad: 'foo = data[1]',
      mathDisplayValue: 'foo',
      mathColorValue: 'foo + 1'
    })
  })

  describe('call', function () {
    it('returns dots with evaluated expressions', function () {
      var seriesList = [
        { target: 'a', datapoints: [[null, 'ts'], [2, 'ts']] }
      ]

      var expected = {
        name: 'a', scratchPad: 2, displayValue: 2, colorValue: 3
      }

      expect(this.subject.call(seriesList)).toEqual([expected])
    })
  })
})
