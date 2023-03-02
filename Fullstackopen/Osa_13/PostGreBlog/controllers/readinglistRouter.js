const router = require('express').Router()
const { Readinglists } = require('../models')


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

router.put('/:id', async (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    const readingList = await Readinglists.findByPk(req.params.id)
    readingList.read = req.body.read
    await readingList.save()
    if(readingList) res.json(readingList)
    else throw Error('No data')

})

module.exports = router