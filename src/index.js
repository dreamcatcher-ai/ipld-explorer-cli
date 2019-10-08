const debug = require('debug')('ipld-explorer-cli')
const Chalk = require('chalk')
const repl = require('./repl')
const Commands = require('./commands')
const { evaluate } = require('./eval')
const { withSpin } = require('./spinner')
const print = require('./print')

module.exports = async function (argv, opts) {
  argv = (argv || process.argv).slice(2)
  opts = opts || {}

  const ctx = await getInitialCtx()
  debug(ctx)
  return argv.length
    ? evalPrint(ctx, argv[0], argv.slice(1), opts)
    : repl(ctx, opts)
}

async function getInitialCtx () {
    wd = '/meow/'
  return { wd }
}

function evalPrint (ctx, cmd, cmdArgs, opts) {
  opts.evaluate = opts.evaluate || withSpin(evaluate)
  return print(() => opts.evaluate(ctx, cmd, cmdArgs))
}
