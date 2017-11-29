import {Presenter} from '../../src/util/presenter'

describe('Presenter', () => {
  let subject
  let panel
  let format
  let dot

  beforeEach(() => {
    format = jasmine.createSpy().and.returnValue('custom')

    panel = {
      defaultColor: 'default', thresholds: [], format: 'custom'
    }

    dot = { colorValue: 99.5, displayValue: 'v', name: 'n' }
    let kbn = { valueFormats: { custom: format } }
    subject = new Presenter(panel, kbn)
  })

  describe('call', () => {
    it('sets the tooltip for each dot', () => {
      subject.call([dot])
      expect(dot.tooltip).toEqual('n<br>custom')
    })

    describe('when there are no thresholds', () => {
      it('assigns the default color', () => {
        subject.call([dot])
        expect(dot.color).toEqual('default')
      })
    })

    describe('when the thresholds are too high', () => {
      it('assigns the default color', () => {
        panel.thresholds.push({ value: '99.6', color: 'color' })
        subject.call([dot])
        expect(dot.color).toEqual('default')
      })
    })

    describe('when a threshold value is reached', () => {
      it('assigns the threshold color', () => {
        panel.thresholds.push({ value: '99', color: 'color' })
        subject.call([dot])
        expect(dot.color).toEqual('color')
      })
    })

    describe('when several thresholds are reached', () => {
      it('uses the closest threshold color', () => {
        panel.thresholds.push({ value: '-99', color: 'color1' })
        panel.thresholds.push({ value: '-79', color: 'color3' })
        panel.thresholds.push({ value: '-89', color: 'color2' })
        subject.call([dot])
        expect(dot.color).toEqual('color3')
      })
    })
  })
})
