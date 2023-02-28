const express = require('express')
require('express-async-errors');
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const middleware = require('./util/middleware')
const blogRouter = require('./controllers/blogRouter')

app.use(express.json())


app.use('/api/blogs', (blogRouter))

app.use(middleware.errorHandler)

const start = async () => {
    await connectToDatabase()
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`)
    })
}

start()