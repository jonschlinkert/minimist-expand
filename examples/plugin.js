var inspect = require('util').inspect;
var plugins = require('minimist-plugins');
var cli = plugins(require('minimist'))
  .use(require('..'));

cli.parse(['--set=a.b.c.d:e', '--set=f:g', '--set=h:i,j,k'], function (err, argv) {
  console.log(inspect(argv, null, 10));
});

