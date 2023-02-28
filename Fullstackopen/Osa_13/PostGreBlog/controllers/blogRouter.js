const router = require('express').Router()

const { Blog } = require('../models')

const blogLookUp = async ( req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req,res) => {
    const blogs = await Blog.findAll()
    if(blogs) res.json(blogs)
    else throw Error('No data')
})

router.post('/', async (req, res) => {
    const blog = await Blog.create(req.body)
    res.json(blog)
    if(!blog) throw Error ('Bad data')
})

router.get('/:id', blogLookUp, async (req, res) => {
    if(req.blog) await res.json(req.blog)
    else throw Error('Not Found')
})

router.delete('/:id', blogLookUp, async (req, res) => {
    if(req.blog) await req.blog.destroy()
    else throw Error('No Content')
})

router.put('/:id', blogLookUp, async (req, res) => {
    if(req.blog){
        req.blog.likes = req.body.likes
        await req.blog.save()
        res.json(req.blog)
    } else throw Error('Not Found')
})

module.exports = router