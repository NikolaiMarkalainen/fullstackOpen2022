import { useState } from 'react'
const People = (prop) => {
  console.log(prop, "In people")
  console.log(prop.name)
  return(
    <li>{prop.name}</li>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPersons, setNewPersons] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    console.log('Button clicked', event.target)
    
    const nameObject = {
      name: newPersons,
      id: persons.length +1,
    }
    setPersons(persons.concat(nameObject))
    console.log('names: ', {persons})
    setNewPersons('')
  }
  
  const handlePersonChange = (event) => {
      console.log(event.target.value)
      setNewPersons(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit ={addPerson}>
        <div>
          name: <input value = {newPersons}
          onChange ={handlePersonChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(people => 
        <People key = {people.id} name = {people.name}/>)}
      <div>
      </div>
    </div>
  )

}

export default App
