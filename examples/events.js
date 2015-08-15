var plugins = require('minimist-plugins');
var cli = plugins(require('minimist'))
  .use(require('..'))
  .use(require('minimist-events')())

cli.on('foo', function (val) {
  console.log('foo =>', val);
});

cli.on('bar', function (val) {
  console.log('bar =>', val);
});

cli.on('baz', function (val) {
  console.log('baz =>', val);
});

cli.parse(['--foo=a.b.c:d', '--bar=f:g', '--baz=h:i,j,k'], function (err, argv) {
  console.log(argv);
});
