import { useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_GENRES, ALL_BOOKS_GENRES, ALL_BOOKS } from "../queries"


const Books = (props) => {

    
  const [selectedGenre, setSelectedGenre] = useState(null)

  let genreVariable = selectedGenre === null ? {} : { genres: selectedGenre }
  const genreList = useQuery(ALL_GENRES)
  const filteredBooks = useQuery(ALL_BOOKS_GENRES,{ variables: genreVariable })

  const genres = genreList.loading ? [] : genreList.data.allGenres
  const books = filteredBooks.loading ? [] : filteredBooks.data.allBooks

  console.log(selectedGenre)
  if (!props.show) {
    return null
  }  

  console.log("BOOKS",books)
  return (
    <div>
      <h2>books</h2>
        <div>
          in genre {selectedGenre}
        </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <li>{genres.map((genre) => <button key={genre} onClick={() => setSelectedGenre(genre)}>{genre}</button>)}</li>
        <button onClick={() => setSelectedGenre(null)}> reset filter </button>
      </div>
    </div>
  )
}

export default Books
