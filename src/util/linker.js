export class Linker {
  constructor (panel, linkSrv) {
    this.panel = panel
    this.linkSrv = linkSrv
  }

  call (dots) {
    dots.forEach(this._createScope, this)
    dots.forEach(this._populateScope, this)
    dots.forEach(this._evaluateLink, this)
    dots.forEach(this._cleanupLink, this)
  }

  _createScope (dot) {
    var scope = Object.assign({}, this.panel.scopedVars)
    dot.linkScope = scope
  }

  _populateScope (dot) {
    this.panel.linkVars.forEach(variable => {
      var value = dot.name.split('.')[variable.index]
      dot.linkScope[variable.name] = { value: value }
    })
  }

  _evaluateLink (dot) {
    var links = this.panel.links || []
    var linkInfo = links[this.panel.linkIndex]

    if (linkInfo === undefined) return

    var args = [linkInfo, dot.linkScope]
    dot.link = this.linkSrv.getPanelLinkAnchorInfo(...args)
  }

  _cleanupLink (dot) {
    if (dot.link === undefined) return

    if (dot.link.href.indexOf('http') === -1) {
      dot.link.href = '/' + dot.link.href
    }
  }
}
