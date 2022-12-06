require('dotenv').config()
const express = require('express')
const app = express()
const Blog = require('./models/blog')

const cors = require('cors')
app.use(express.json())
const morgan = require('morgan')
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

app.put('/api/blogs/:id', (request, response) => {
    const {like} = request.body
     Blog.findByIdAndUpdate(request.params.id, {like})
    .then(updatedBlog => {
        response.json(updatedBlog)
    })
})



app.post('/api/blogs', (request,response) => {
    const body = request.body    
    
    const blog = new Blog ({
        title: body.title,
        author: body.author,
        url: body.url,
        like: parseInt(0),
        id: body.id
    })
    blog.save().then((savedBlog) => {
        response.json(savedBlog)
    })
})


app.get('/info', (request,response) => {
    response.send('<h1>Hello World</h1>')
})

app.get('/api/blogs', (request,response) => {
    console.log(Blog)
        Blog.find({}).then(blog => {
            response.json(blog)
        })
    })

 app.get('/api/blogs/:id', (request,response) => {
    Blog.findById(request.params.id)
    .then(blog => {
        if(blog){
            response.json(blog)
        }
        else{
            response.status(404).end()
        }
    })
 })   

app.delete('/api/blogs/:id', (request,response) => {
    Blog.findByIdAndRemove(request.params.id)
    .then(() => {
        response.status(204).end()
    })
})



const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})