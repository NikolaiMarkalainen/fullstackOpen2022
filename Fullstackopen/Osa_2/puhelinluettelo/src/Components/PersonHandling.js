import listService from "../services/list"
import "../style.css"
const PersonHandling = ({newPersons,newNumber,setNewNumber,setNewPersons,persons, setPersons,errorMessage,setErrorMessage}) => {

const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newPersons,
      number: newNumber
    }
    const result  = persons.map(person => person.name)
    if(result.includes(newPersons)){
      const foundId = persons.filter(obj => {
      return obj.name.includes(newPersons)
      })
      const id = foundId.map(person => person.id)
      if(window.confirm('Do you want to replace the number of ' + `${newPersons}`)){
        listService
        .update(id, nameObject)
        .then(response=>{
          setPersons(persons.concat(response.data))
          setNewPersons('')
          setNewNumber('')
          window.location.reload()
      })
      }
    }

    else{    
      listService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setErrorMessage(<div className={"add"}> {newPersons}:  Has been added </div>)
        setNewPersons('')
        setTimeout(() => {
        setErrorMessage(null)
       }, 5000)
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