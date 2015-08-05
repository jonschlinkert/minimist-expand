/*!
 * minimist-expand <https://github.com/jonschlinkert/minimist-expand>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var expand = require('expand-object');

module.exports = function minimistExpand(argv) {
  argv = splitArgs(argv);
  argv = splitOpts(argv);
  return argv;
};

function splitOpts(argv) {
  var res = {};
  for (var key in argv) {
    if (!argv.hasOwnProperty(key)) {
      continue;
    }

    var orig = argv[key];
    var val = orig.toString();

    if (~key.indexOf(':') && val === 'true') {
      var parts = key.split(':');
      res[parts[0]] = parts[1];
      continue;
    }

    if (Array.isArray(orig) && key !== '_') {
      res[key] = orig.map(expand);
      continue;
    }

    if (~val.indexOf(':')) {
      res[key] = expand(val);
      continue;
    }

    res[key] = orig;
  }
  return res;
}

function splitArgs(argv) {
  var arr = (argv._ || []).slice(0);
  var len = arr.length, i = -1;
  var num = -1;
  while (++i < len) {
    var arg = arr[i];
    var val = arg.split(':');
    if (val.length > 1) {
      argv[val[0]] = val[1];
      argv._.splice(i - (++num), 1);
    }
  }
  return argv;
}
