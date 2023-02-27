const router = require('express').Router()

const { Blog } = require('../models')

const blogLookUp = async ( req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}


router.get('/api/blogs', async (req,res) => {
    const blogs = await Blog.findAll()
    console.log(blogs.map(b=>b.toJSON()))
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
})

router.post('/api/blogs', async (req,res) => {
    try{
        console.log(req.body)
        const blog = await Blog.create(req.body)
        res.json(blog)
    } catch(error){
        return res.status(400).json({ error })
    }
})

router.get('/api/blogs/:id', blogLookUp, async (req, res) => {
    if (req.blog) {
        res.json(req.blog)
        console.log(req.blog.toJSON())
    } else{ 
        res.status(400).end()
    }
})

router.delete('/api/blogs/:id', blogLookUp, async (req, res) => {
    if(req.blog) {
        req.blog.destroy()
        console.log('Blog deleted')
    } else{
        res.status(400).end()
    }
})


module.exports = router