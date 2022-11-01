import { useState } from 'react'

const People = ({name, phoneNumber}) => {
  console.log(name, "In people")
  console.log(phoneNumber)

  return(
    <li>{name} {phoneNumber}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPersons, setNewPersons] = useState('')
  const [newNumber, setNewNumber] = useState([])

  const addPerson = (event) => {
    event.preventDefault()
    console.log('Button clicked', event.target)
    console.log({persons}, "person")
    const nameObject = {
      name: newPersons,
      id: persons.length +1,
      number: newNumber
    }
    const result  = persons.map(person => person.name)
    console.log(result , "result")
    if(result.includes(newPersons)){
      alert(`${newPersons} is already added to phonebook`)
    }
    else{    
    console.log({persons},"name")
    setPersons(persons.concat(nameObject))
    console.log('names: ', {persons})
    setNewPersons('')
  }
  }


  const handlePersonChange = (event) => {
      setNewPersons(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
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
      
        {persons.map(people => 
        <People key = {people.id} name = {people.name} phoneNumber = {people.number}/>)}
      <div>
      </div>
    </div>
  )

}

export default App
