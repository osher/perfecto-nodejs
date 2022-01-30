module.exports = ({
  dal: { people, getJson },
}) => {
  return {
    byId: async (id) => {
      //input check
      if (!id || typeof id != 'number') {
          throw new Error('must provide numeric id of the person');
      }
      
      //fetch
      const person = await people.byId(id);
      
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
      
      return {
          person,
          films: filmsData,
          vehicles: vehiclesData,
          starships: starshipsData,
      }
    }
  }
}