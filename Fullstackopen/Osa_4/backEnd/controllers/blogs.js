const blogRouter = require('express').Router()
const Blog = require('../models/blog')
console.log(Blog)
console.log('in blogRouter')


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

blogRouter.post('/',(request,response, next) => {
    const body = request.body
    console.log(request)
    const blog = new Blog ({
        title: body.title,
        author: body.author,
        url: body.url,
        like: parseInt(0),
        id: body.id
    })
    blog.save()
        .then(savedBlog => {
            response.json(savedBlog)
        })
        .catch(error => next(error))
})

blogRouter.put('/:id', (request, response, next) => {
    const { like } = request.body
    Blog.findByIdAndUpdate(request.params.id, { like }, { context:'query' })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})



blogRouter.get('/info', (request,response) => {
    response.send('<h1>Hello World</h1>')
})


blogRouter.delete('/:id', (request,response, next) => {
    Blog.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

module.exports = blogRouter