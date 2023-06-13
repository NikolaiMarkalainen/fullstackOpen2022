const Print = ({countries,setNewArray, array}) => {
  
    const handleCountry = (event, index) => {
      event.preventDefault()
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