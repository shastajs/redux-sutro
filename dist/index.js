'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _tahoe = require('tahoe');

var _templateUrl = require('template-url');

var _templateUrl2 = _interopRequireDefault(_templateUrl);

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var replaceWithActions = function replaceWithActions(out, start, options) {
  (0, _keys2.default)(start).forEach(function (k) {
    var v = start[k];
    if (!v.path || !v.method) {
      out[k] = replaceWithActions({}, v, options);
      return;
    }
    out[k] = (0, _tahoe.createAction)((0, _extends3.default)({
      endpoint: function endpoint(opt) {
        if (options.rootUrl) return (0, _urlJoin2.default)(options.rootUrl, (0, _templateUrl2.default)(v.path, opt));
        return (0, _templateUrl2.default)(v.path, opt);
      },
      method: v.method,
      credentials: 'include'
    }, options));
  });
  return out;
};

exports.default = function (resources) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var start = resources.toJS ? resources.toJS() : resources;
  return replaceWithActions({}, start, options);
};

module.exports = exports['default'];