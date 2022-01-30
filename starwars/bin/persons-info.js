const args = require('../lib/args')({ process });
const logger = require('../lib/logger')(args);

logger.trace({args}, "initiated with args");

if (args.error) {
  console.error(args.error);
  process.exit(1);
}

if (!args.id) {
  console.error('must provide id of the person');
  process.exit(1);
}

const personProfile = require('../lib/jobs/person-profile');

logger.info({id: args.id, output: args.output }, "processing person profile");

(async () => {
/*
  personProfile({ args})
  .then(view => console.log(view))
  .catch(err => {
    console.error("unexpected error", {
      message: err.message,
      stack: err.stack.split('\n'),
    });
  });
*/

  try {
    const view = await personProfile({ args, logger });
    logger.info({ view: view.slice(0, 50) + "..." }, "saved");
  } catch(err) {
    logger.error("unexpected error", {
      message: err.message,
      stack: err.stack.split('\n'),
    })
  }
})();
