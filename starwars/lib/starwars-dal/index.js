const request = require('request');
/*
javascript hoisting

let const => block ScriptProcessorNode
function, var => function scope, hoisted
*/

module.exports = ({baseUrl}) => {

	return {
    getJson,
		people: {
			byId: byIdFetcher('people'),
		},
    vehicle: {
			byId: byIdFetcher('vehicles'),
		},
		planet: {
			list: () => 1,
			byId: byIdFetcher('planets'),
		}
	};

  function byIdFetcher(entity) {
    return (id) => getJson(`${baseUrl}/${entity}/${id}`)
  }

  function getJson(url) {
    return new Promise((accept, reject) => {
      request(
        url,
        { json: true },
        (err, {
          body,
        }) => {
          if (err) return reject(err);
          accept(body);
        }
      );
    })
  };
}
