const args = require('../lib/args')({ process });

if (args.error) {
  console.error(args.error);
  process.exit(1);
}

if (!args.id) {
  console.error('must provide id of the person');
  process.exit(1);
}

const starwars = require('../lib/starwars-dal')(args.starwars);
const { getJson, people } = starwars;

(async () => {
  //input check
  if (!args.id) {
    console.error('must provide id of the person');
    process.exit(1);
  }

  //fetch
  const person = await people.byId(args.id);

  const { films, vehicles, starships } = person;

  const [
    filmsData,
    vehiclesData, 
    starshipsData,
  ] = await Promise.all([
    Promise.all( films.map(getJson)),
    Promise.all( vehicles.map(getJson)),
    Promise.all( starships.map(getJson)),
  ]);

  //view
  console.log(
    [
      person.name,
      list('appears', filmsData, ({title, release_date}) => `${title}, from ${release_date}`),
      list('rode vehicles', vehiclesData, ({name, model}) => `${name},  a ${model}`),
      list('piloted ships', starshipsData, ({name, model}) => `${name}, a ${model}`),
    ].join('\n')
  )

  function list(title, arr, mapper) {
    return `\n${title}: ${listFormat(arr.map(mapper))}`
  }

  function listFormat(list) {
    list = ["", ...list];
    return list.length > 1
      ? list.join('\n - ')
      : 'nothing'
  }
})();





/*

transpiles to:
//-----------------

(function() {
  starwars.people.byId(1)
  .then((person) => {

    const { vehicles } = person;

    Promise.all( vehicles.map(url => getJson(url)))
    .then(vehiclesData => {


      .then(() => {

        const vehicleLines = vehiclesData.map(({name, model}) => `${name} is a ${model}`);
        console.log(`${person.name} rode: \n - ${vehicleLines.join('\n - ')}`);
      })


    })
  })
})()
*/


/*
//another style
//-----------------

const ctx = {}

starwars.people.byId(1)
.then( person => {
  ctx.person = person
  return 	Promise.all( ctx.person.vehicles.map(url => getJson(url)))
})
.then( vehiclesData => {
  ctx.vehiclesData =  vehiclesData;


})
.then( vehiclesData => {
  ctx.vehiclesData =  vehiclesData;
  

})
.then(formatOutput)

*/