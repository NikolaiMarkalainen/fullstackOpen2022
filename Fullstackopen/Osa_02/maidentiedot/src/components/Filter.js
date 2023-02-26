const Filter = ({search,setSearch, country
        ,setNewArray}) =>{
    const handleSearch = (event) =>{
      setSearch(event.target.value)

      const countries = country.map((country)=>{
        return country
      })
      let search = event.target.value.toLowerCase()
      const searchResult = countries.filter(countries => {
        return countries.name.common.toLowerCase().includes(search)
      })
      setNewArray(searchResult)

    }
    return(
        <div>
          Filter <input value = {search}
          onChange={handleSearch}/>
        </div>

      )
}  
export default Filter