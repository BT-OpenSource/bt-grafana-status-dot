import {Builder} from '../../src/util/builder'

describe('Builder', () => {
  let subject

  beforeEach(() => {
    subject = new Builder({
      mathScratchPad: 'foo = data[1]',
      mathDisplayValue: 'foo',
      mathColorValue: 'foo + 1'
    })
  })

  describe('call', () => {
    it('returns dots with evaluated expressions', () => {
      let seriesList = [
        { target: 'a', datapoints: [[null, 'ts'], [2, 'ts']] }
      ]

      let expected = {
        name: 'a', scratchPad: 2, displayValue: 2, colorValue: 3
      }

      expect(subject.call(seriesList)).toEqual([expected])
    })
  })
})
