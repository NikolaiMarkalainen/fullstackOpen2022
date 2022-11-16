import ShowList from './ShowList'

const People = ({ newSearch,newArray, people, setPersons}) => {

    return(
      <div>
        <ShowList 
        newSearch={newSearch}
        newArray={newArray}
        people = {people}
        setPersons ={setPersons}/>
      </div>
    )
  }
  export default People