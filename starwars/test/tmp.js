



const foo = async () => {
    const planet = await stDal.planets.byId(2);
   
    const { name } = planet;
  
    console.log(`the planet is ${name}`)
  }
  
  const foo = () => {
    return stDal.planets.byId(2)
    .then((planet) => {
      const { name } = planet;
      console.log(`the planet is ${name}`)       
  
    });
  };