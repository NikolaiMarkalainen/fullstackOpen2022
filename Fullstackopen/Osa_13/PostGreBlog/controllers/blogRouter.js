const router = require('express').Router()

const { Blog, User } = require('../models')
const {tokenExtractor} = require('../util/middleware')
const blogLookUp = async ( req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req,res) => {
    const blogs = await Blog.findAll({
        attributes: {exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name']
        }
    })
    if(blogs) res.json(blogs)
    else throw Error('No data')
})

router.post('/', tokenExtractor ,async (req, res) => {
    const user =  await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id})
    res.json(blog)
    if(!blog || !user ) throw Error ('Bad data')
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