import listService from "../services/list"
import '../style.css'
const ShowList = ({newSearch,newArray,people,setPersons, errorMessage,setErrorMessage}) => {


  const handlePersonDelete = (event, personButton) => {
    event.preventDefault()
  if(window.confirm('Do you want to delete ' + `${personButton.name}`)){
    listService
    .remove(personButton.id)
    .then(response => {
      setPersons(people.concat(response.data))
      window.location.reload()
    })
    .catch(e => {
      setErrorMessage(<div className={"error"}> {personButton.name}: has already been deleted` </div>)
      setTimeout(() => {
        setErrorMessage(null)
       }, 5000)
    })
  }
  }

   if(newSearch.length === 0){
    
    return(
      <form onSubmit ={handlePersonDelete}>

      <div>
            {people.map((person,index) => (
              <p key ={index}>
                <button type="submit"
                key = {index} 
                onClick={ e => handlePersonDelete(e, person)}>Delete </button>
                {person.name} : {person.number}
              </p>
            ))}
      </div>
      </form>
    )
    }
    else if (newSearch.length > 0){
      return(
        <form onSubmit ={handlePersonDelete}>
        <div>
        {newArray.map((filteredPerson, index) => (
          <p key ={index}>
             <button type="submit"
              key = {index} 
              onClick={ (event) => handlePersonDelete(event, filteredPerson)}>Delete </button>
            {filteredPerson.name} : {filteredPerson.number}
          </p>
        ))}
       </div>
       </form>
      )
    }
}
export default ShowList