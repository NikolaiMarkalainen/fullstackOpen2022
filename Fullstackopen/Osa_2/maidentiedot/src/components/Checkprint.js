import Details from "./Details"
import Print from "./Print"

const Checkprint = ({newArray, setNewArray, search, array}) => {
      if(newArray.length < 10 && newArray.length > 1){
        return(
          <div>
            <Print 
            countries = {newArray}
            setNewArray= {setNewArray}
            search = {search}
            array = {newArray} />
          </div>
        )
      }
      else if(newArray.length > 10){
          return(
          <div>
            Too many countries with the letter
          </div>
          )
        }
      else if(newArray.length === 1){
        return(
        <div>
          <Details country = {newArray[0]}/>
        </div>
        )
      }
      else if(newArray.length == null){
        return(
          <div>
            <Details country = {newArray}/>
          </div>
          )
      }
  }
  export default Checkprint