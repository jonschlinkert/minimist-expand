/*!
 * minimist-expand <https://github.com/jonschlinkert/minimist-expand>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

/* deps: mocha */
var assert = require('assert');
var should = require('should');
var minimist = require('minimist');
var expand = require('./')(minimist);

describe('expand', function () {
  it('should expand args to object values:', function () {
    expand(['--set=a:b']).should.eql({_: [], set: {a: 'b'}});
    expand(['--set=a.b.c:d']).should.eql({_: [], set: {a: {b: {c: 'd'}}}});
  });

  it('should expand args to array values:', function () {
    expand(['--set=a:b,c:d']).should.eql({_: [], set: [{a: 'b'}, {c: 'd'}]});
    expand(['--set=a.b.c:d,e,f']).should.eql({_: [], set: {a: {b: {c: ['d', 'e', 'f']}}}});
  });

  it('should expand object args:', function () {
    expand(['a:b']).should.eql({_: [], a: 'b'});
  });
});

describe('_', function () {
  it('should ignore non-opts that have string values:', function () {
    expand(['a', 'b']).should.eql({_: ['a', 'b']});
  });
});
