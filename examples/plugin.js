var inspect = require('util').inspect;
var minimist = require('minimist');
var cli = require('minimist-plugins')(minimist);

cli(['--set=a.b.c.d:e', '--set=f:g', '--set=h:i,j,k'])
  .use(require('..'))

console.log(inspect(cli.argv, null, 10));
