import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
query{
    allBooks {
        title,
        published,
        author{
            name
        },
        genres,
        id
    }
}
`

export const ALL_AUTHORS = gql`
query{
    allAuthors{
        name,
        born
    }
}
`

export const CREATE_BOOK = gql`
mutation createBook(
    $title: String!, 
    $published: Int!,
    $genres: [String!]!,
    $author: String!
    ) {
    addBook(title: $title, published: $published, genres: $genres, author: $author) {
        title
        author{
            name
        }
        published
        genres
    }
}
`

export const UPDATE_BIRTH = gql`
    mutation updateBirth(
        $name: String!
        $born: Int!
    ) {
        editBirth(name: $name, born: $born){
            name
            born
        }
    }
`

export const LOGIN = gql `
    mutation login (
        $username: String!,
        $password: String!
    ) {
        login(
            username: $username,
            password: $password
        ) {
            value
        }
    }
`