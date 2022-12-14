const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user",{ username:1, name:1 })
    response.json(blogs)
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

blogRouter.post('/', middleware.userExtractor, async (request,response, next) => {
    const body = await request.body
    const user = await request.user
    console.log("USER",user)
    const blog = new Blog ({
        title: body.title,
        author: body.author,
        url: body.url,
        like: 0,
        user: user._id
    })
    if(blog.title === undefined || blog.url === undefined || blog.author === undefined){
        response.status(400).end()
    }
    else{
        console.log("saving")
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        console.log("saved")
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


blogRouter.delete('/:id', middleware.userExtractor, async (request,response, next) => {
    const decodedToken = request.user
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)
    let blogUserId = blog.user.toString()
    if( blogUserId === user.id.toString() ){
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    else{
        return response.status(401).json({ error: 'Invalid user priviledge' })
    }

})

module.exports = blogRouter