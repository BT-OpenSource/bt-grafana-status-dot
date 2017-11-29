import {Styler} from '../../src/util/styler'

describe('Styler', () => {
  let subject
  let dot

  beforeEach(() => {
    subject = new Styler({ radius: 1 })
    dot = { color: 'blue' }
  })

  describe('call', () => {
    it('assigns the style for each dot', () => {
      subject.call([dot])
      expect(dot.style['background']).toEqual('blue')
      expect(dot.style['width']).toEqual(1)
      expect(dot.style['height']).toEqual(1)
    })
  })
})
