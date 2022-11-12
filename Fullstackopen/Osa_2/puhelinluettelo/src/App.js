import { useState} from 'react'
import PersonHandling from './Components/PersonHandling'
import Checking from './Components/Checking'
import Filter from './Components/Filter'

const App = () => {
  const[newArray, setNewArray] = useState([])
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id:1,number: '040-123456' },
    { name: 'Ada Lovelace', id:2,number: '39-44-5323523' },
    { name: 'Dan Abramov', id:3,number: '12-43-234345' },
    { name: 'Mary Poppendieck', id:4,number: '39-23-6423122' }
  ])
  const [newPersons, setNewPersons] = useState('')
  const [newNumber, setNewNumber] = useState([])
  const [newSearch, setNewSearch] = useState([])
  
    return (
    <div>
      <h2>Phonebook Search</h2>
      <Filter persons = {persons} setNewSearch = {setNewSearch} setNewArray ={setNewArray}
      newSearch = {newSearch}/>
      <h2>Add a new Person</h2>
      <PersonHandling newPersons = {newPersons} newNumber = {newNumber}
      setNewNumber = {setNewNumber} setNewPersons = {setNewPersons}
      setPersons = {setPersons} persons = {persons}/>
      <h2>Numbers</h2>  
     <Checking newArray={newArray} persons={persons} newSearch={newSearch}/>
    </div>
  )
}
export default App