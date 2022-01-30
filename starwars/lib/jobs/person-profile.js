
const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

/*
//simpleton manual promisify implementation:
const writeFile = (...a) => new Promise(({accept, reject}) => {
  fs.writeFile(...a, (err, data) => {
    err ? reject(err) : accept(data)
  })
})
*/

module.exports = async ({ args/*, logger */}) => {
  const dal = require('../starwars-dal')(args.starwars);
  const personModel = require('../model/person')({dal})
  //we created the function getById and excuted it here, using the message factory
  const { person, homeworld, films, vehicles, starships } = await personModel.getById(args.id);


  const view = [
    `${person.name} is from ${homeworld.name}`,
    list('appears', films, ({title, release_date}) => `${title}, from ${release_date}`),
    list('rode vehicles', vehicles, ({name, model}) => `${name},  a ${model}`),
    list('piloted ships', starships, ({name, model}) => `${name}, a ${model}`),
  ].join('\n');

  await writeFile(args.output.file, view);

  return view;

  function list(title, arr, mapper) {
    return `\n${title}: ${listFormat(arr.map(mapper))}`;
  }

  function listFormat(list) {
    list = ["", ...list];
    return list.length > 1
      ? list.join('\n - ')
      : 'nothing'
  }
};

