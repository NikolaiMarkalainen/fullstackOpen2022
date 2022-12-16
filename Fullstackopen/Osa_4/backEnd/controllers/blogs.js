const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = async request => {
const authorization =  await request.get('authorization') 
if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log("authorized")
    console.log("authorization sub", authorization.substring(7))
    return authorization.substring(7)  
}  
     return null
}
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

blogRouter.post('/', async (request,response, next) => {
    const body = await request.body
    const token = await getTokenFrom(request) 
    console.log("before decode",token) 
    const decodedToken = jwt.verify(token, process.env.SECRET)  
    if (!token || !decodedToken.id) {    
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
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
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
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