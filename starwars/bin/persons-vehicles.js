const args = require('../lib/args')({ process })


const starwars = require('../lib/starwars-dal')({ baseUrl: 'https://swapi.dev/api'});
const { getJson } = starwars;

(async () => {
  const person = await starwars.people.byId(1);

  const { vehicles } = person;

  const vehiclesData = await Promise.all( vehicles.map(getJson));

  const vehicleLines = vehiclesData.map(({name, model}) => `${name} is a ${model}`);

  console.log(`${person.name} rode: \n - ${vehicleLines.join('\n - ')}`);
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