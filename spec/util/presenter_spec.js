import {Presenter} from '../../src/util/presenter'

describe('Presenter', function () {
  beforeEach(function () {
    this.format = jasmine.createSpy().and.returnValue('custom')

    this.panel = {
      defaultColor: 'default', thresholds: [], format: 'custom'
    }

    this.dot = { colorValue: 100, displayValue: 'v', name: 'n' }
    var kbn = { valueFormats: { custom: this.format } }
    this.subject = new Presenter(this.panel, kbn)
  })

  describe('call', function () {
    it('sets the tooltip for each dot', function () {
      this.subject.call([this.dot])
      expect(this.dot.tooltip).toEqual('n<br>custom')
    })

    describe('when there are no thresholds', function () {
      it('assigns the default color', function () {
        this.subject.call([this.dot])
        expect(this.dot.color).toEqual('default')
      })
    })

    describe('when the thresholds are too high', function () {
      it('assigns the default color', function () {
        this.panel.thresholds.push({ value: 101, color: 'color' })
        this.subject.call([this.dot])
        expect(this.dot.color).toEqual('default')
      })
    })

    describe('when a threshold value is reached', function () {
      it('assigns the threshold color', function () {
        this.panel.thresholds.push({ value: 100, color: 'color' })
        this.subject.call([this.dot])
        expect(this.dot.color).toEqual('color')
      })
    })

    describe('when several thresholds are reached', function () {
      it('uses the closest threshold color', function () {
        this.panel.thresholds.push({ value: 99, color: 'color1' })
        this.panel.thresholds.push({ value: 89, color: 'color2' })
        this.subject.call([this.dot])
        expect(this.dot.color).toEqual('color1')
      })
    })
  })
})
