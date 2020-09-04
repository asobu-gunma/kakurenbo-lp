import MarkdownIt from 'markdown-it'

export default ({ app }, inject) => {

  const md = new MarkdownIt({ //markdownitのオプション
    html: true,
    linkify: true,
    typography: true,
    injected: true,
  })

  const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const targetIndex = tokens[idx].attrIndex('target')
    const relIndex = tokens[idx].attrIndex('rel')
    if (tokens[idx]['attrs'][0][1].match('http')) {
      if (targetIndex < 0) {
        tokens[idx].attrPush(['target', '_blank'])
      } else {
        tokens[idx].attrs[targetIndex][1] = '_blank'
      }

      if (relIndex < 0) {
        tokens[idx].attrPush(['rel', 'noopener'])
      } else {
        tokens[idx].attrs[relIndex][1] = 'noopener'
      }
    }
    return defaultRender(tokens, idx, options, env, self);
  }

  inject('md', md)
}