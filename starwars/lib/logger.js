const { assign } = Object;
const fs = require('fs');
const pino = require('pino');
module.exports = ({
  logger: {
    levels,
    prettyPrint,
    prettyOptions,
  },
  package: { name, version },
}) => {

    const options = {
      channel: 'swappi-cli',
      level: levels.default,
    };

    if (  fs.existsSync('./node_modules/pino-pretty')
      && prettyPrint
      && prettyOptions
    ) {
      options.transport = {
        target: 'pino-pretty',
        options: prettyOptions,
      }
    }

    const baseLogger = pino(options).child({
      pkg: { name, version }
    });
    
    const of = channel => {
      const childLogger = baseLogger.child({ channel });

      const level = levels[channel] || levels.default;
      childLogger.level = level;
      childLogger.of = of;
      return childLogger;
    };

    baseLogger.of = of;

    return baseLogger;
}


