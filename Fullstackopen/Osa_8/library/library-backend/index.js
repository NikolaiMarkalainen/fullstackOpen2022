const { 
  ApolloServer, 
  UserInputError,
  AuthenticationError,
  gql 
} = require('apollo-server')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
mongoose.set('strictQuery', true)
const Book = require('./models/books')
const Author = require('./models/authors')
const config = require('./utils/config')

const JWT_SECRET = config.SECRET
const MONGODB_URI = config.MONGODB_URI
const PORT = config.PORT


mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch((error) => {
    console.log('error connecting to mongodb')
  })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Books {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  enum YesNo {
    YES
    NO
  }

  type Query{
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String genres: String): [Books]!
    allAuthors: [Author!]
}

  type Mutation{
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ):[Books]!
    editBirth(
        name: String!
        born: Int!
    ): Author
  }


  `

const resolvers = {
  Query: {
    bookCount: () =>  books.length,
    authorCount: () => authors.length,
    allBooks: (root,args) => {
        if(args.author !== undefined && args.genres !== undefined){
            console.log("Authors", args.author, "Genres", args.genres)
            const filteresApplied = books.filter(book =>{ 
                return book.genres.some(genre => args.genres.includes(genre) && book.author === args.author)})
            return filteresApplied.length > 0 ? filteresApplied : []
        }
        else if(args.author !== undefined){
            const filteredByAuthors = books.filter(book => book.author === args.author)
            return filteredByAuthors
        }
        else if(args.genres !== undefined){
            const booak = books.map(book => book.genres)
            console.log('Genres', [args.genres], 'Book genres', [booak] )
            const filteredByGenres = books.filter(book => {
                return book.genres.some(genre => args.genres.includes(genre))
            })
            return filteredByGenres.length > 0 ? filteredByGenres : []
        }
        else{
            console.log('HERE')
            return books
        }
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root, args) => {
        const found = books.filter(b => b.author === root.name)
        return found.length
    }
  },
  Books: {
    author: (root) => {
      return{
        name: root.name,
        born: root.born,
      }
    },
  },
  Mutation: {
    addBook: async (root, args) =>{
        const author = new Author ({name: args.author, born:undefined})
        const book  = new Book ({...args, author: author})
        console.log(author)

        try{
          await book.save()
          await author.save()
          const exsistingAuthor = authors.find(a => a.name === book.author)
          books = books.concat(book)
          if(exsistingAuthor !== null){
              const author = new Author ({name: args.author, born: undefined})
              console.log(exsistingAuthor, "EXISTING")
              authors = authors.concat(author)
              return authors && books
          }
          else{
              return books
          } 
        } catch (error){
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
              
        }
    },
    editBirth: (root, args) => {
        console.log(args)
        const author = authors.find(a => a.name === args.name)
        if(!author){
            return null
        }
        console.log('FOUND AUTHOR', author)
        const updatedAuthor = {...author, born: args.born}
        authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
        console.log(updatedAuthor)
        console.log(authors)
        return updatedAuthor
    }
  }
}



const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

