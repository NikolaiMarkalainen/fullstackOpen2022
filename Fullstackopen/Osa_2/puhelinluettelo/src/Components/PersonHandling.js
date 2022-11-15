import listService from '../../src/services/list'

const PersonHandling = ({newPersons,newNumber,setNewNumber,setNewPersons,persons, setPersons}) => {

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
      listService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewPersons('')
      })
  }
  }


const handlePersonChange = (event) => {
    setNewPersons(event.target.value)
} 
const handlePhoneChange = (event) => {
  setNewNumber(event.target.value)
}


return(
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

)

}
export default PersonHandling