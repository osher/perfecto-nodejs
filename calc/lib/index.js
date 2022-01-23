const debug = require('debug')('calc');

debug('calc is loading');

module.exports = {
  add: require('./operators/add'),
  sub: require('./operators/sub'),
}