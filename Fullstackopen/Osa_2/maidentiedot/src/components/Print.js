const Print = ({countries,setNewArray, array}) => {
  
    const handleCountry = (event, index) => {
      event.preventDefault()
      console.log("ass")
      console.log("array",array)
      console.log(index)
      console.log("data",array[index])
      setNewArray(array[index])

      setNewArray(array[index])
  }
  
   return(
    <ul>
        {countries.map((country, index) =>{ 
      return(
      <form onSubmit = {handleCountry} key = {index}>
        <li>
          {country.name.common} 
          <button id = {index} type="submit" 
          onClick={ e => handleCountry(e, index)}>Show details</button>
        </li> 
      </form>)})}
    </ul>
  
   )
  }
  export default Print