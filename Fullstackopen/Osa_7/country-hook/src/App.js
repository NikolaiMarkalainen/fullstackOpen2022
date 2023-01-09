import { useState, useEffect } from 'react'
import axios from 'axios'


// useField manages useState for you and onchange effect
// returns the value with the useField component that uses the hook
// accessed by useField.variable.value
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
    console.log(value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState('')

  useEffect(() => {
    const subscription = name.subscribe()
    axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
    .then(response =>{
      setCountry(response.data)
      subscription.unsubscribe()
    })
  })
  console.log('THE COUNTRY', country)
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country[0].name.common}</h3>
      <div>population {country[0].population}</div> 
      <div>capital {country[0].capital}</div>
      <img src={country[0].flags.png} height='100' alt={`flag of ${country[0].name.common}`}/> 
    </div>
  )  
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    console.log(name)
  }
// form sends data to fetch where it puts name as the search variable
// our search variable is managed in nameInput hook which uses useField
// we need to get this name to our useEffect to find the data and set the variable to country
// country is the useCountryhook and sends name in there which we assigned in our fetch function once submitted
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App