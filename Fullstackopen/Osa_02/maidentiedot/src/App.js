import axios from 'axios'
import {useEffect,useState} from 'react'
import Filter from './components/Filter'
import Checkprint from './components/Checkprint'

const App = () => {
  const [newCountry, setCountry] = useState([])
  const [newSearch, setNewSearch] = useState([])
  const [newArray, setNewArray] = useState([])
 

  useEffect(() =>{
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response =>{
    setCountry(response.data)
    })
  }, [])
  return (
    <div>
    <h1>Search for a country</h1>
    <Filter 
    search = {newSearch} 
    setSearch = {setNewSearch}
    country = {newCountry} 
    setNewArray = {setNewArray}/>
    <div>
    <Checkprint 
    countries = {newCountry} 
    newArray = {newArray} 
    setNewArray = {setNewArray}
    search = {newSearch}
    array = {newArray}/>
    </div>
    </div>
  )
}

export default App;
