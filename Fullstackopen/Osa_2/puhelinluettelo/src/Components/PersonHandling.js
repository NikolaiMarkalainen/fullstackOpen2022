import listService from "../services/list"

const PersonHandling = ({newPersons,newNumber,setNewNumber,setNewPersons,persons, setPersons}) => {

const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newPersons,
      number: newNumber
    }
    const result  = persons.map(person => person.name)
    console.log(result)
    console.log(newPersons)
    console.log(result.includes(newPersons))
    if(result.includes(newPersons)){

      const foundId = persons.filter(obj => {
        return obj.name.includes(newPersons)
      })
      const id = foundId.map(person => person.id)
      console.log(foundId)
      if(window.confirm('Do you want to replace the number of ' + `${newPersons}`)){
      listService
      .update(id, nameObject)
      .then(response=>{
        setPersons(persons.concat(response.data))
        setNewPersons('')
      })
    }
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