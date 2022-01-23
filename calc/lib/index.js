const debug = require('debug')('calc');

debug('calc is loading');

const cmds = {
  add: require('./operators/add'),
  sub: require('./operators/sub'),
}

module.exports = (cmd, operands) => {
  if (!cmds[cmd]) throw new Error('Unsupported command: ' + cmd);



};
