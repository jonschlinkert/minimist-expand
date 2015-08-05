var minimist = require('minimist');
var cli = require('minimist-events')(minimist, {
  // postProcess ensures that we'll get events on modified objects
  postProcess: require('..')
});

cli.on('foo', function (val) {
  console.log('foo =>', val);
});

cli.on('bar', function (val) {
  console.log('bar =>', val);
});

cli.on('baz', function (val) {
  console.log('baz =>', val);
});

cli.parse(['--foo=a.b.c:d', '--bar=f:g', '--baz=h:i,j,k'])
