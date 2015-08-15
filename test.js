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
var plugins = require('minimist-plugins');
var expand = require('./');
var cli;

describe('expand', function () {
  beforeEach(function () {
    cli = plugins(minimist);
  });

  it('should expand args to object values:', function (done) {
    cli.use(expand);

    cli.parse(['--set=a:b'], function (err, res) {
      res.should.eql({_: [], set: {a: 'b'}});
    });

    cli.parse(['--set=a.b.c:d'], function (err, res) {
      res.should.eql({_: [], set: {a: {b: {c: 'd'}}}});
      done();
    });
  });

  it('should expand args to array values:', function (done) {
    cli.use(expand);
    cli.parse(['--set=a:b,c:d'], function (err, res) {
      res.should.eql({_: [], set: [{a: 'b'}, {c: 'd'}]});
    });
    cli.parse(['--set=a.b.c:d,e,f'], function (err, res) {
      res.should.eql({_: [], set: {a: {b: {c: ['d', 'e', 'f']}}}});
      done();
    });;
  });

  it('should expand object args:', function (done) {
    cli.use(expand);
    cli.parse(['a:b'], function (err, res) {
      res.should.eql({_: [], a: 'b'});
    });
    cli.parse(['a:b', 'c'], function (err, res) {
      res.should.eql({_: ['c'], a: 'b'});
      done();
    });
  });
});

describe('_', function () {
  it('should pass-through non-opts that have string values:', function (done) {
    cli.use(expand);
    cli.parse(['a', 'b'], function (err, res) {
      res.should.eql({ _: [ 'a', 'b' ] });
      done();
    })
  });
});
