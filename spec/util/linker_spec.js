import {Linker} from '../../src/util/linker'

describe('Linker', function () {
  beforeEach(function () {
    this.panel = {
      linkVars: [{ name: 'var1', index: '1' }],
      scopedVars: { 'var0': { value: 'val0' } }
    }

    this.dot = { name: 'val0.val1.val2' }
    this.linkSrv = { getPanelLinkAnchorInfo: function () { } }
    this.subject = new Linker(this.panel, this.linkSrv)
  })

  it('assigns a link scope to each dot', function () {
    var expected = {
      var0: { value: 'val0' }, var1: { value: 'val1' }
    }

    this.subject.call([this.dot])
    expect(this.dot.linkScope).toEqual(expected)
  })

  describe('when the panel has no links', function () {
    it('skips assigning the scoped link', function () {
      this.subject.call([this.dot])
      expect(this.dot.link).toEqual(undefined)
    })
  })

  describe('when the panel link is invalid', function () {
    beforeEach(function () {
      this.panel.links = []
      this.panel.linkIndex = 0
    })

    it('skips assigning the scoped link', function () {
      this.subject.call([this.dot])
      expect(this.dot.link).toEqual(undefined)
    })
  })

  describe('when the panel has a link', function () {
    beforeEach(function () {
      this.panel.links = ['linkInfo']
      this.panel.linkIndex = 0
    })

    it('calls the linkSrv with the dot scope', function () {
      spyOn(this.linkSrv, 'getPanelLinkAnchorInfo')
      this.subject.call([this.dot])
      var linkFn = this.linkSrv.getPanelLinkAnchorInfo
      expect(linkFn).toHaveBeenCalledWith('linkInfo', this.dot.linkScope)
    })

    it('assigns a scoped link to each dot', function () {
      spyOn(this.linkSrv, 'getPanelLinkAnchorInfo').and.returnValue('link')
      this.subject.call([this.dot])
      expect(this.dot.link).toEqual('link')
    })
  })
})
