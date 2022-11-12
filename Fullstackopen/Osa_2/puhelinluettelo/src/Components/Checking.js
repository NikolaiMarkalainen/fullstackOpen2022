import People from './People'

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

    export default Checking