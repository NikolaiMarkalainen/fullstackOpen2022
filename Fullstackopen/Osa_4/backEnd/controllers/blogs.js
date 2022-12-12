const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/',(request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})


blogRouter.get('/:id', (request,response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if(blog){
                response.json(blog)
            }
            else{
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogRouter.post('/', async (request,response, next) => {
    const body = request.body
    console.log(request)
    const blog = new Blog ({
        title: body.title,
        author: body.author,
        url: body.url,
        like: parseInt(0),
        id: body.id
    })
    if(blog.title === undefined || blog.url === undefined || blog.author === undefined){
        response.status(400).end()
    }
    else{
        blog.save()
        .then(savedBlog => {
            response.status(201).json(savedBlog)
        })
        .catch(error => next(error)) 
    }


})

blogRouter.put('/:id', (request, response, next) => {
    const { like } = request.body
    Blog.findByIdAndUpdate(request.params.id, { like }, {new:true, runValidators:true, context:'query' })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})



blogRouter.get('/info', (request,response) => {
    response.send('<h1>Hello World</h1>')
})


blogRouter.delete('/:id', async (request,response, next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogRouter