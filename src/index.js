import { createAction } from 'tahoe'
import template from 'template-url'

const replaceWithActions = (out, start, options) => {
  Object.keys(start).forEach((k) => {
    const v = start[k]
    if (!v.path || !v.method) {
      out[k] = replaceWithActions({}, v, options)
      return
    }
    out[k] = createAction({
      endpoint: (opt) => template(v.path, opt),
      method: v.method,
      credentials: 'include',
      ...options
    })
  })
  return out
}

export default (resources, options = {}) => {
  const start = resources.toJS ? resources.toJS() : resources
  return replaceWithActions({}, start, options)
}
