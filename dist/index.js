'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _tahoe = require('tahoe');

var _pluralize = require('pluralize');

var _normalizr = require('normalizr');

var _templateUrl = require('template-url');

var _templateUrl2 = _interopRequireDefault(_templateUrl);

var _lodash = require('lodash.reduce');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resourceToActions = function resourceToActions(resourceName, resource, options) {
  var model = new _normalizr.Schema(resourceName);
  // model.define(mapValues(resource.model.relationships, relationshipMap))

  return (0, _lodash2.default)(resource.endpoints, function (prev, _endpoint) {
    prev[_endpoint.name] = (0, _tahoe.createAction)((0, _extends3.default)({
      endpoint: function endpoint(opt) {
        return (0, _templateUrl2.default)(_endpoint.path, opt);
      },
      method: _endpoint.method,
      model: model,
      collection: !_endpoint.instance,
      credentials: 'include'
    }, options));
    return prev;
  }, {});
};

exports.default = function (resources) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (0, _lodash2.default)(resources.toJS ? resources.toJS() : resources, function (prev, v, k) {
    prev[(0, _pluralize.plural)(k)] = resourceToActions(k, v, options);
    return prev;
  }, {});
};

module.exports = exports['default'];