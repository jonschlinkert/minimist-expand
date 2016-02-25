/*!
 * minimist-expand <https://github.com/jonschlinkert/minimist-expand>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var expandArgs = require('expand-args');

module.exports = function expandPlugin(options) {
  return function(cli) {
    return function(argv, next) {
      argv = expandArgs(argv, options);
      argv._ = argv._ || [];
      next(null, argv);
    };
  };
};
