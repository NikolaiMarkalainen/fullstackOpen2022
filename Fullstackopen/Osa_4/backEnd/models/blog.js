const mongoose = require('mongoose')
const url = process.env.MONGODB_URI


console.log('Connecting to', url)
mongoose.connect(url)
.then( () => {
    console.log("Connected to MongoDB")
})
.catch((error) => {
    console.log("Error connecting to MongoDb", error.message)
})

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    like: Number,
    id: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)