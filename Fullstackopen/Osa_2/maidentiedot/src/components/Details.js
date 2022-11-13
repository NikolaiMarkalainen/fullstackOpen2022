

const Details = ({country}) => {
    console.log("in Country")
    return(
      <div>
      <h1>{country.name.common}</h1>
      Capital: {country.capital}
      <br></br>
      Area: {country.area}
      <br></br>
      Population: {country.population}
      <br></br>
      <br></br>
      <img src={country.flags.png} style={{border: "2px solid #555"}}/>
      <h2>Languages</h2>
      <br></br>
      <div>
        {Object.entries(country.languages).map(([key, val]) =>{
        return(
            <div key ={key}>
              {val}
            </div>
        )})}
      </div>
      </div>
    )
  }
  export default Details