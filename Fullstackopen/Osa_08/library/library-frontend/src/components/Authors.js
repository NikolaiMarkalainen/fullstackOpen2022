import { useMutation } from "@apollo/client"
import { useState } from "react"
import { UPDATE_BIRTH, ALL_AUTHORS, ALL_BOOKS } from "../queries"
import Select from 'react-select'

const Authors = (props) => {
  const [year,setYear]= useState('')
  const [selectedOption, setSelectedOptions] = useState(null)
  const [updateBirth] = useMutation(UPDATE_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS  }]
  })
  if (!props.show) {
    return null
  }
  console.log(props)
  const authors = props.data
  console.log(props)
  const nullBirth = authors.filter(author => author.born === null)

  const submit = async (event) => {
    event.preventDefault()
    console.log(selectedOption.name)
    updateBirth({ variables: { name: selectedOption.name, born: parseInt(year) }})
    setYear('')
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h1>Set birthyear</h1>
        <form onSubmit={submit}>
         <Select 
         defaultValue={selectedOption}
         onChange={setSelectedOptions}
         options={nullBirth}
         getOptionLabel={option => option.name}
         />
         <div>
           born
           <input
           type="number"
           value={year}
           onChange={({ target }) => setYear(target.value)}
           />
         </div>
         <button type="submit">update birth</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
