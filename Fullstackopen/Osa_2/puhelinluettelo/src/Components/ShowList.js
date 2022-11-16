import listService from "../services/list"
const ShowList = ({newSearch,newArray,people,setPersons}) => {


  const handlePersonDelete = (event, index) => {
    event.preventDefault()
    console.log(index)
    console.log(event.target.value)
    const names = (people.map(person => person.name))
    const id = (people.map(person => person.id))


  if(window.confirm('Do you want to delete ' + `${names[index]}`)){
    listService
    .remove(id[index])
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
                onClick={ e => handlePersonDelete(e, index)}>Delete </button>
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
              onClick={ (event) => handlePersonDelete(event, index)}>Delete </button>
            {filteredPerson.name} : {filteredPerson.number}
          </p>
        ))}
       </div>
       </form>
      )
    }
}
export default ShowList