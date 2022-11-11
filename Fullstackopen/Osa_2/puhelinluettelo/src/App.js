import { useState} from 'react'

const People = ({name, phoneNumber}) => {
  return(
    <li>{name} {phoneNumber}</li>
  )
}

const Checking = ({newArray,persons, newSearch}) => {
  if(newSearch.length === 0){
    return(
      <div>
      {persons.map(people => 
      <People key = {people.id} name = {people.name} phoneNumber = {people.number}/>)}
      </div>
    )
    }
    else if (newSearch.length > 0){
      return(
      <div>
        {newArray.map(people => 
        <People key = {people.id} name = {people.name} phoneNumber = {people.number}/>)}
      </div>
      )
    }
  } 

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
  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newPersons,
      id: persons.length +1,
      number: newNumber
    }
    const result  = persons.map(person => person.name)
    if(result.includes(newPersons)){
      alert(`${newPersons} is already added to phonebook`)
    }
    else{    
      setPersons(persons.concat(nameObject))
      setNewPersons('')
  }
  }
  const handlePersonChange = (event) => {
      setNewPersons(event.target.value)
      console.log(event.target.value)
  } 
  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    
    setNewSearch(event.target.value)
    const names = persons.map((person) => {
      return person
    })
    let search = event.target.value.toLowerCase()
    const searchResult = names.filter(name => {
      return name.name.toLowerCase().includes(search)
    })
    setNewArray(searchResult)
    console.log("searchresult",searchResult) 
    console.log("array",newArray)
    }
    return (
    <div>
      <h2>Phonebook Search</h2>
      <div>
        Keywords <input value = {newSearch} 
        onChange={handleSearchChange}/>
      </div>
      <h2>Add a new Person</h2>
      <form onSubmit ={addPerson}>
        <div>
          Full name: <input value = {newPersons}
          onChange ={handlePersonChange}/>
        </div>
        <div>
          Phonenumber: <input value = {newNumber}
          onChange = {handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>  
     <Checking newArray={newArray} persons={persons} newSearch={newSearch}/>
    </div>
  )
}
export default App