const router = require('express').Router()
const { Blog } = require('../models')
const { sequelize, Op } = require('../util/db')



router.get('/', async (req, res) => {
    const authors = await Blog.findAll({
        attributes:[ 
            'author',
            'likes',
            [sequelize.fn('count', sequelize.col('*')), 'articles']
        ],
        group:['author', 'likes'],
        order: [
            [sequelize.fn('max', sequelize.col('likes')), 'DESC']
        ]
    })
    if(authors){
        res.json(authors)
    }
})

module.exports = router