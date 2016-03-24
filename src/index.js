import { createAction } from 'tahoe'
import { plural } from 'pluralize'
import { Schema } from 'normalizr'
import template from 'template-url'
import reduce from 'lodash.reduce'

const resourceToActions = (resourceName, resource, options = {}) => {
  const model = new Schema(resourceName)
  // model.define(mapValues(resource.model.relationships, relationshipMap))

  return reduce(resource.endpoints, (prev, endpoint) => {
    prev[endpoint.name] = createAction({
      endpoint: (opt) => template(endpoint.path, opt),
      method: endpoint.method,
      model: model,
      collection: !endpoint.instance,
      credentials: 'include',
      ...options
    })
    return prev
  }, {})
}

export default (resources) =>
  reduce((resources.toJS ? resources.toJS() : resources), (prev, v, k) => {
    prev[plural(k)] = resourceToActions(k, v)
    return prev
  }, {})
