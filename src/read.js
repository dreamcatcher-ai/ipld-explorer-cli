const Inquirer = require('inquirer')
const InquirerCommandPrompt = require('inquirer-command-prompt')
const debug = require('debug')('ipld-explorer-cli:read')
Inquirer.registerPrompt('command', InquirerCommandPrompt)
const chalk = require('chalk')

const machineId = 'dreamcatcher'
const user = 'guest'

exports.read = (ctx) => {
  debug(ctx)
  const message = `${chalk.green(`${user}@${machineId}`)}:${chalk.blue(ctx.wd)}$`

  const question = { type: 'command', name: 'input', message, prefix: '#', context: 0  }
  if (ctx.autoComplete) {
    question.autoCompletion = ctx.autoComplete.getList
  }

  return Inquirer.prompt([question])
}
 