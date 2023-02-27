const router = require('express').Router()

const { Blog } = require('../models')

const blogLookUp = async ( req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}


router.get('/', async (req,res) => {
    const blogs = await Blog.findAll()
    console.log(blogs.map(b=>b.toJSON()))
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
})

router.post('/', async (req,res) => {
    try{
        console.log(req.body)
        const blog = await Blog.create(req.body)
        res.json(blog)
    } catch(error){
        return res.status(400).json({ error })
    }
})

router.get('/:id', blogLookUp, async (req, res) => {
    if (req.blog) {
        res.json(req.blog)
        console.log(req.blog.toJSON())
    } else{ 
        res.status(400).end()
    }
})

router.delete('/:id', blogLookUp, async (req, res) => {
    if(req.blog) {
        await req.blog.destroy()
        console.log('Blog deleted')
    } 
        res.status(204).end()
})

router.put('/:id', blogLookUp, async (req, res) => {
    if(req.blog) {
        req.blog.likes = req.body.likes
        console.log('REQBLOGLIKES', req.blog.likes)
        console.log('REQBODYLIKES', req.body.likes)
        await req.blog.save()
        res.json(req.blog)
    } else {
        res.status(404).end()
    }
})


module.exports = router