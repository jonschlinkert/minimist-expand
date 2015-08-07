# minimist-expand [![NPM version](https://badge.fury.io/js/minimist-expand.svg)](http://badge.fury.io/js/minimist-expand)

> Expand minimist args with expand-object.

**Example**

* minimist parses `--set=a:b` to `{ _: [], set: 'a:b' }`
* minimist-expand then uses [expand-args](https://github.com/jonschlinkert/expand-args) to convert `a:b` to `{a: 'b'}`

```js
var argv = require('minimist');

argv(['--set=a:b']);
//=> { _: [], set: 'a:b' }

expand(argv(['--set=a:b']));
//=> { _: [], set: {a: 'b'}}
```

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i minimist-expand --save
```

## Usage

```js
var argv = require('minimist')(process.argv.slice(2));
var expand = require('minimist-expand');

// '--set=a:b'
expand(argv);
//=> {_: [], set: {a: 'b'}}
```

**Examples**

Values are expanded by [expand-object](https://github.com/jonschlinkert/expand-object):

```js
// '--foo=a.b.c:d'
expand({foo: 'a.b.c:d'});
//=> {_: [], foo: {a: {b: {c: 'd'}}}}

// '--bar=a:b,c:d'
expand({bar: 'a:b,c:d'});
//=> {_: [], bar: [{a: 'b'}, {c: 'd'}]}

// '--baz=a.b.c:d,e,f'
expand({baz: 'a.b.c:d,e,f'});
//=> {_: [], baz: {a: {b: {c: ['d', 'e', 'f']}}}}
```

## Events

Use with [minimist-events](https://github.com/jonschlinkert/minimist-events):

```js
var minimist = require('minimist');
var expand = require('minimist-expand');
var cli = require('minimist-events')(minimist, {
  // postProcess ensures that we'll get events on expanded values
  postProcess: expand
});

cli.on('foo', function (val) {
  //=> { a: { b: { c: 'd' } } }
});

cli.on('bar', function (val) {
  //=> { f: 'g' }
});

cli.on('baz', function (val) {
  //=> { h: [ 'i', 'j', 'k' ] }
});

// args: '--foo=a.b.c:d --bar=f:g --baz=h:i,j,k'
cli(process.argv.slice(2));
```

See the [working example](./examples/events.js).

## Use as a plugin

Use as a plugin with [minimist-plugins](https://github.com/jonschlinkert/minimist-plugins):

```js
var minimist = require('minimist');
var cli = require('minimist-plugins')(minimist);

// args: `--set=a.b.c.d:e --set=f:g --set=h:i,j,k`
cli(process.argv.slice(2))
  .use(require('minimist-expand'))

console.log(cli.argv)
// { _: [],
//   set:
//    [ { a: { b: { c: { d: 'e' } } } },
//      { f: 'g' },
//      { h: [ 'i', 'j', 'k' ] } ] }
```

## Related projects

* [minimist-events](https://github.com/jonschlinkert/minimist-events): Add events to minimist, ~30 sloc.
* [minimist-plugins](https://github.com/jonschlinkert/minimist-plugins): Simple wrapper to make minimist pluggable. ~20 sloc.
* [minimist](https://github.com/substack/minimist): parse argument options

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/minimist-expand/issues/new)

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on August 07, 2015._