module.exports = async ({ args/*, logger */}) => {
  const dal = require('../starwars-dal')(args.starwars);
  const personModel = require('../model/person')({dal})
  const { person, homeworld, films, vehicles, starships } = await personModel.byId(args.id);

  //view
  return [
    `${person.name} is from ${homeworld.name}`,
    list('appears', films, ({title, release_date}) => `${title}, from ${release_date}`),
    list('rode vehicles', vehicles, ({name, model}) => `${name},  a ${model}`),
    list('piloted ships', starships, ({name, model}) => `${name}, a ${model}`),
  ].join('\n');

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

