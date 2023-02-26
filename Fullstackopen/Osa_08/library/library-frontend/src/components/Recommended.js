import { useQuery } from "@apollo/client"
import { useState } from "react"
import { ME, ALL_BOOKS_GENRES } from "../queries"

const Recommended = (props) => {
    const userData = useQuery(ME)
    const user = userData.loading ? [] : userData.data.me

    const genreData = useQuery(ALL_BOOKS_GENRES, {variables: {genres: user.favoriteGenre}})
    const recommendedBooks = genreData.loading ? [] : genreData.data.allBooks
    
    console.log(recommendedBooks)
    
    if(recommendedBooks.length < 1){
        return(
            <>
            <h1>Recommendations</h1>
            <div>
                Books in your favorite genre: <b>{user.favoriteGenre}</b>
            </div>
            <br></br>
            <div>
                There are no book recommendations for your favorite genre.
            </div>
            </>
        )
    }
    if(!props.show){
        return null
    }

return(
    <>
    <h1>Recommendations</h1>
    <div>
        books in your favorite genre: <b>{user.favoriteGenre}</b>
        <br></br>
        <br></br>
        <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    </>
)


}

export default Recommended

