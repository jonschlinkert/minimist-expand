/*!
 * minimist-expand <https://github.com/jonschlinkert/minimist-expand>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var expandArgs = require('expand-args');
var forward = require('forward-object');

module.exports = function minimistExpand(minimist) {
  // allow args to be passed directly
  if (typeof minimist === 'object') {
    return expandArgs(minimist);
  }

  // otherwise, expect minimist to be a function
  if (typeof minimist !== 'function') {
    throw new TypeError('expected minimist to be a function.');
  }

  function proxy() {
    var argv = minimist.apply(minimist, arguments);
    argv = expandArgs(argv);
    return argv;
  }

  forward(proxy, minimist);
  return proxy;
};
