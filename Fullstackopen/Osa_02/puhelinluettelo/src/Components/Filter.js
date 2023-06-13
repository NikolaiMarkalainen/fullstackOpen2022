const Filter = ({persons,setNewSearch,setNewArray, newSearch}) => {
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    const names = persons.map((person) => {
      return person
    })
    let search = event.target.value.toLowerCase()
    const searchResult = names.filter(name => {
      return name.name.toLowerCase().includes(search)
    })
    setNewArray(searchResult)
  }

return(
    <div>
        Filter <input value = {newSearch} 
        onChange={handleSearchChange}/>
    </div>
)
}
export default Filter