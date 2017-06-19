import {Presenter} from '../../src/util/presenter'

describe('Presenter', function () {
  beforeEach(function () {
    this.options = {
      defaultColor: 'default', thresholds: []
    }

    this.subject = new Presenter(this.options)
  })

  describe('call', function () {
    var dot = { colorValue: 100 }

    describe('when there are no thresholds', function () {
      it('assigns the default color', function () {
        this.subject.call([dot])
        expect(dot.color).toEqual('default')
      })
    })

    describe('when the thresholds are too high', function () {
      it('assigns the default color', function () {
        this.options.thresholds.push({ value: 101, color: 'color' })
        this.subject.call([dot])
        expect(dot.color).toEqual('default')
      })
    })

    describe('when a threshold value is reached', function () {
      it('assigns the threshold color', function () {
        this.options.thresholds.push({ value: 100, color: 'color' })
        this.subject.call([dot])
        expect(dot.color).toEqual('color')
      })
    })

    describe('when several thresholds are reached', function () {
      it('uses the closest threshold color', function () {
        this.options.thresholds.push({ value: 99, color: 'color1' })
        this.options.thresholds.push({ value: 89, color: 'color2' })
        this.subject.call([dot])
        expect(dot.color).toEqual('color1')
      })
    })
  })
})
