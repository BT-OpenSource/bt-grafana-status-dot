export class Linker {
  constructor (panel, linkSrv) {
    this.panel = panel
    this.linkSrv = linkSrv
  }

  call (dots) {
    dots.forEach(dot => { dot.linkScope = { } })
    dots.forEach(this._populateScope, this)
    dots.forEach(this._link, this)
  }

  _populateScope (dot) {
    this.panel.linkVars.forEach(variable => {
      var value = dot.name.split('.')[variable.index]
      dot.linkScope[variable.name] = { value: value }
    })
  }

  _link (dot) {
		if (this.panel.links === undefined) return
    var scope = this.panel.scopedVars

    var linkInfo = this.panel.links[this.panel.linkIndex]
    if (linkInfo === undefined) return

    dot.link = this.linkSrv.getPanelLinkAnchorInfo(
      linkInfo, Object.assign({}, scope, dot.linkScope))
  }
}
