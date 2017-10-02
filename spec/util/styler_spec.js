import {Styler} from '../../src/util/styler'

describe('Styler', function () {
  beforeEach(function () {
    this.subject = new Styler({ radius: 1 })
    this.dot = { color: 'blue' }
  })

  describe('call', function () {
    it('assigns the style for each dot', function () {
      this.subject.call([this.dot])
      expect(this.dot.style['background']).toEqual('blue')
      expect(this.dot.style['width']).toEqual(1)
      expect(this.dot.style['height']).toEqual(1)
    })
  })
})
