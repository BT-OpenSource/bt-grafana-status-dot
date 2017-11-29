import {Linker} from '../../src/util/linker'

describe('Linker', () => {
  let subject
  let panel
  let dot
  let linkSrv

  beforeEach(() => {
    panel = {
      linkVars: [{ name: 'var1', index: '1' }],
      scopedVars: { 'var0': { value: 'val0' } }
    }

    dot = { name: 'val0.val1.val2' }
    linkSrv = { getPanelLinkAnchorInfo: () => { } }
    subject = new Linker(panel, linkSrv)
  })

  describe('call', () => {
    it('assigns a link scope to each dot', () => {
      let expected = {
        var0: { value: 'val0' }, var1: { value: 'val1' }
      }

      subject.call([dot])
      expect(dot.linkScope).toEqual(expected)
    })

    describe('when the panel has no links', () => {
      it('skips assigning the scoped link', () => {
        subject.call([dot])
        expect(dot.link).toEqual(undefined)
      })
    })

    describe('when the panel link is invalid', () => {
      beforeEach(() => {
        panel.links = []
        panel.linkIndex = 0
      })

      it('skips assigning the scoped link', () => {
        subject.call([dot])
        expect(dot.link).toEqual(undefined)
      })
    })

    describe('when the panel has a link', () => {
      beforeEach(() => {
        panel.links = ['linkInfo']
        panel.linkIndex = 0
      })

      it('calls the linkSrv with the dot scope', () => {
        spyOn(linkSrv, 'getPanelLinkAnchorInfo')
        subject.call([dot])
        let linkFn = linkSrv.getPanelLinkAnchorInfo
        expect(linkFn).toHaveBeenCalledWith('linkInfo', dot.linkScope)
      })

      it('assigns a scoped link to each dot', () => {
        let link = { href: 'http' }
        spyOn(linkSrv, 'getPanelLinkAnchorInfo').and.returnValue(link)
        subject.call([dot])
        expect(dot.link).toEqual(link)
      })

      it('cleans up links with relative URLs', () => {
        let link = { href: 'link' }
        spyOn(linkSrv, 'getPanelLinkAnchorInfo').and.returnValue(link)
        subject.call([dot])
        expect(dot.link.href).toEqual('/link')
      })
    })
  })
})
