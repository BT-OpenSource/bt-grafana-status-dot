export class Styler {
  constructor (panel) {
    this.panel = panel
  }

  call (dots) {
    dots.forEach(this._style.bind(this))
  }

  _style (dot) {
    dot.style = { }
    dot.style['background'] = dot.color
    dot.style['width'] = this.panel.radius
    dot.style['height'] = this.panel.radius
  }
}
