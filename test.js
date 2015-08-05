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
var argv = require('minimist');
var expand = require('./');

describe('expand', function () {
  it('should expand args to object values:', function () {
    expand({set: 'a:b'}).should.eql({set: {a: 'b'}});
    expand({set: 'a.b.c:d'}).should.eql({set: {a: {b: {c: 'd'}}}});
  });

  it('should expand args to array values:', function () {
    expand({set: 'a:b,c:d'}).should.eql({set: [{a: 'b'}, {c: 'd'}]});
    expand({set: 'a.b.c:d,e,f'}).should.eql({set: {a: {b: {c: ['d', 'e', 'f']}}}});
  });

  it('should fix object args mistakenly set as booleans:', function () {
    expand({'a:b': true}).should.eql({a: 'b'});
  });
});


describe('_', function () {
  it('should ignore non-opts with string values:', function () {
    expand({_: ['a', 'b']}).should.eql({_: ['a', 'b']});
  });
});
