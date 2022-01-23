const debug = require('debug')('calc');

debug('calc is loading');

const cmds = {
  add: require('./operators/add'),
  sub: require('./operators/sub'),
}

const calc = (cmd, operands) => {
  const command = cmds[cmd];
  if (!command) throw new Error('Unsupported command: ' + cmd);

  debug('will run command', { cmd, operands});

  return command(...operands)
};
calc.cmds = cmds;


module.exports = calc