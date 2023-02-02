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
const User = require('./models/user')
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }

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
    allGenres: [String!]!
    allBooks(author: String genres: String): [Books]!
    allAuthors: [Author!]
    me: User
}
  type Mutation{
    
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Books!
    
    editBirth(
        name: String!
        born: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!  
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
  }
  `

const resolvers = {
  Query: {
    me:(root, args, context) => {
      Author.collection.remove()
      console.log(context.currentUser)
      console.log(context)
      return context.currentUser
    },
    bookCount: () =>  Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root,args, context) => {
      const book = await Book.find({}).populate('author')
      console.log(book)
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
        const filteredBooks = book.filter( book =>
        book.genres.includes(args.genres))
        console.log(filteredBooks)
        return filteredBooks
      }
      return book
    },
    allGenres: async () => {
      const book = await Book.find({})
      return Array.from(new Set(book.map(book => book.genres).flat()))
    },
    allAuthors: async () => {
      const authors =  await Author.find({})
      return authors
    },
  },
  Author: {
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,
  },
  Books: {
    title: (root) => root.title,
    published: (root) => root.published,
    author: async(root) => root.author,
    id: (root) => root.id,
    genres: (root) => root.genres,
  },
  Mutation: {
    addBook: async (root, args, context) =>{
      const currentUser = context.currentUser
      if(!currentUser){
        throw new UserInputError(' Log in to add book')
      }
      if(args.author.length < 4){
        throw new UserInputError (' author name too short ')
      }
      if( args.title.length < 2 ){
        throw new UserInputError (' title of book is too short ')
      }
      let author = await Author.findOne({ name: args.author })
      if(!author) {
        author = new Author ({name: args.author, born: null})
      }
      let book = new Book ({ ...args, author: author })
      try{
        console.log("LINE155",book)
        await author.save()
        await book.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book

    },
    editBirth: async (root, args, context) => {
      const currentUser = context.currentUser
      if(!currentUser){
        throw new UserInputError(' Log in to edit birth')
      }
      let author = await Author.findOne({name: args.name})
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
    },
    createUser: async (root, args) => {
      const user = new User ({ username: args.username, favoriteGenre: args.favoriteGenre })
      console.log(user)
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },

    login: async(root, args) => {
      const user = await User.findOne({ username: args.username })
      if(!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET)}
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if( auth && auth.toLowerCase().startsWith('bearer ')){
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id).populate('favoriteGenre')
      return { currentUser }
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
