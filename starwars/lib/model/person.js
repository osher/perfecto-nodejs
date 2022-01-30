module.exports = ({
  dal: { people, getJson },
}) => {
  //person is a function factory, getPersonById creates a new person
  return {
    getPersonById: async (id) => {
      //input check
      if (!id || typeof id != 'number') {
          throw new Error('must provide numeric id of the person');
      }
      
      //fetch
      const person = await people.byId(id);
      
      const { homeworld, films, vehicles, starships } = person;

      const [
        homeworldData,
        filmsData,
        vehiclesData, 
        starshipsData,
      ] = await Promise.all([
          getJson(homeworld),
          Promise.all( films.map(getJson)),
          Promise.all( vehicles.map(getJson)),
          Promise.all( starships.map(getJson)),
      ]);
      
      return {
          person,
          homeworld: homeworldData,
          films: filmsData,
          vehicles: vehiclesData,
          starships: starshipsData,
      }
    }
  }
}