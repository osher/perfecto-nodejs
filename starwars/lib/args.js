const merge = require('lodash.merge');
const config = require('config');
const minimist = require('minimist');

module.exports = ({
  process: { 
    argv,
    env,
  }
}) => {
  const args = argv.slice(2);
  const switches = minimist(args);

  return merge(config, switches);
};
