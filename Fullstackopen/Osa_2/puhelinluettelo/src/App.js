import { useEffect, useState} from 'react'
import PersonHandling from './Components/PersonHandling'
import Filter from './Components/Filter'
import listService from './services/list'
import ShowList from './Components/ShowList'
import './style.css'
import Notification from './Components/Notification'

const App = () => {
  const[newArray, setNewArray] = useState([])
  const [persons, setPersons] = useState([ ])
  const [newPersons, setNewPersons] = useState('')
  const [newNumber, setNewNumber] = useState([])
  const [newSearch, setNewSearch] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  
  useEffect(() =>{
    console.log('effect')
    listService
    .getAll()
    .then(response =>{
    setPersons(response.data)
    })
  }, [])  
    return (
    <div>
      <h2>Phonebook Search</h2>
        <Notification message={errorMessage}/>
      <Filter 
        persons = {persons} 
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
        persons = {persons}
        errorMessage= {errorMessage}
        setErrorMessage={setErrorMessage}/>
      <h2>Numbers</h2>  
      <ShowList 
        newSearch={newSearch}
        newArray={newArray}
        people = {persons}
        setPersons ={setPersons}
        errorMessage = {errorMessage}
        setErrorMessage = {setErrorMessage}/>
    </div>
  )
}
export default App