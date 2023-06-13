import axios from 'axios'
import {useEffect,useState} from 'react'
const api_key = process.env.REACT_APP_API_KEY

const Details = ({country}) => {
  const [weather, setWeather] = useState([])
  const REACT_APP_API_URL = 'http://api.openweathermap.org/data/2.5/weather?q='
  
  const units = "metric"

  useEffect(()=>{
    axios
    .get(REACT_APP_API_URL+country.capital+'&appid='+api_key+'&units='+units)
    .then(response =>{
      setWeather(response)
      console.log("response",response)
    })
  }, [])
  

  const Weather = (weather) => {
    if (weather.weather.length === 0){
      <div></div>
    }
    else {
    const weatherData = weather.weather.data
    console.log("weather",weather)
    const icon = weatherData.weather[0].icon  
    const iconURL = 'http://openweathermap.org/img/wn/'
    const endURL = '@2x.png'
    console.log(weatherData.weather[0])
    console.log("weather.weather.data.weather",weather.weather.data.weather)
    console.log("weather.weather.data.weather[0]",weather.weather.data.weather[0])
    console.log("weather.weather.data.weather[0].icon",weather.weather.data.weather[0].icon)

    return(
      <div>
        Temperature: {weatherData.main.temp} C
        <br></br>
        Weather description: {weatherData.weather[0].description}
        <br></br>
        <img style = {{border: "2px solid #555"}}src={iconURL + icon + endURL}></img>
        <br></br>
        Windspeed: {weatherData.wind.speed} m/s
       
      </div>
    )
    }
}

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
      <div>
        {Object.entries(country.languages).map(([key, val]) =>{
        return(
            <div key ={key}>
              {val}
            </div>
        )})}
      </div>
      <h2>Weather</h2>
      <Weather
      weather = {weather} 
      />
      </div>
    )
  }
  export default Details