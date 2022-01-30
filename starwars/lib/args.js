const merge = require('lodash.merge');
const config = require('config');
const minimist = require('minimist');

module.exports = ({
  process: { 
    argv,
  },
}) => {
  const args = argv.slice(2);
  const switches = minimist(args, {});
  const { name, version } = require('../package');

  const error = 
    switches.id && 'number' != typeof switches.id && '--id must parse into a number';

  return merge(config, switches, { package: { name, version }, error });
};
