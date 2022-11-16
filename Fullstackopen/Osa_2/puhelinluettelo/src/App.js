import { useEffect, useState} from 'react'
import PersonHandling from './Components/PersonHandling'
import Checking from './Components/Checking'
import Filter from './Components/Filter'
import listService from './services/list'
const App = () => {
  const[newArray, setNewArray] = useState([])
  const [persons, setPersons] = useState([ ])
  const [newPersons, setNewPersons] = useState('')
  const [newNumber, setNewNumber] = useState([])
  const [newSearch, setNewSearch] = useState([])
  
  useEffect(() =>{
    console.log('effect')
    listService
    .getAll()
    .then(response =>{
      console.log('Promise fulfilled')
    setPersons(response.data)
    })
  }, [])
  console.log('render',persons.length,' People')
  
    return (
    <div>
      <h2>Phonebook Search</h2>
      <Filter persons = {persons} 
      setNewSearch = {setNewSearch}
      setNewArray ={setNewArray}
      newSearch = {newSearch}/>
      <h2>Add a new Person</h2>
      <PersonHandling 
      newPersons = {newPersons}
      newNumber = {newNumber}
      setNewNumber = {setNewNumber}
      setNewPersons = {setNewPersons}
      setPersons = {setPersons}
      persons = {persons}/>
      <h2>Numbers</h2>  
     <Checking 
     newArray={newArray} 
     persons={persons} 
     newSearch={newSearch}/>
    </div>
  )
}
export default App