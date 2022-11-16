import listService from '../../src/services/list'




const People = ({ name, phoneNumber, people}) => {

  const handlePersonDelete = (event) => {
    event.preventDefault()
    console.log("clicked")
    console.log(people)
    const deletingName = people.name
    console.log(deletingName)
  if(window.confirm('Do you want to delete ' + `${deletingName}`)){
    listService
    .remove(people.id)
  }
  }


  console.log(people)
    return(
      <form onSubmit ={handlePersonDelete}>
      <li> 
        <button type="submit" 
        onClick={handlePersonDelete}>
        Delete</button>
       {name} {phoneNumber}</li>
      </form>
    )
  }
  export default People