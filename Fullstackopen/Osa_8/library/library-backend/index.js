const { 
  ApolloServer, 
  UserInputError,
  AuthenticationError,
  gql 
} = require('apollo-server')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
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



const typeDefs = gql`

  type Author {
    name: String!
    id: ID!
    born: Int
  }
  type Books {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
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
    bookCount: () =>  Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root,args) => {
      const book = await Book.find({}).populate('author')
      if(args.author !== undefined && args.genres !== undefined){
        (book.filter(book => {
          return book.genres.some(genre => args.genres.includes(genre))
        }))
       book.filter(book => {
          return book.genres.some(genre => args.genres.includes(genre) && book.author === args.author)
        })
      }
      else if(args.author !== undefined){
        return book.filter(book => book.author.name === args.author)
      }
      else if(args.genres !== undefined){
        book.filter (book =>{
          return book.genres.some(genre => args.genres.includes(genre))
        })
      }
      return book
    },
    allAuthors: async (root,args) => {
      const authors =  await Author.find({})
      return authors
    }
  },
  Author: {
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,
  },
  Books: {
    title: (root) => root.title,
    published: (root) => root.published,
    async author(root) {
      return await Author.find({ name:root })
    },
    id: (root) => root.id,
    genres: (root) => root.genres,
  },
  Mutation: {
    addBook: async (root, args) =>{
      try{
      const author = await Author.findOne({name: args.author})
      const book  = new Book ({...args, author: author._id})
      if(!author) {
        const newAuthor = new Author ({name: args.author, born: null})
        await newAuthor.save()
        await book.save()
      }
      else{
        console.log(book)
        await book.save()
      }
    } catch(error) {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
    }
    },
    editBirth: async (root, args) => {
      let author = await Author.find({name: args.name})
      if(!author){
        return null
      }
      try{
        author.born = args.born
        console.log(author)
        await author.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
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
