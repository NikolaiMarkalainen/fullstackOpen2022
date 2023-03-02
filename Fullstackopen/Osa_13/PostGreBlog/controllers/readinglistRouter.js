const router = require('express').Router()
const { Readinglists } = require('../models')
const { sequelize, Op } = require('../util/db')


router.post('/', async (req, res) => {
    const {userId, blogId} = req.body
    const readingList = Readinglists.create({
        userId: userId,
        blogId: blogId
    })
    console.log(readingList)
    if(readingList) res.json(readingList)
    else throw Error('No data')
})

module.exports = router