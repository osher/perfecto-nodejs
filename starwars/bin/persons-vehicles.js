const args = require('../lib/args')({ process });
//TBD: init logger
if (args.error) {
  console.error(args.error);
  process.exit(1);
}

if (!args.id) {
  console.error('must provide id of the person');
  process.exit(1);
}

const personProfile = require('../lib/jobs/person-profile');


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
    const view = await personProfile({ args});
    console.log(view);
  } catch(err) {
    console.error("unexpected error", {
      message: err.message,
      stack: err.stack.split('\n'),
    })
  }
})();
