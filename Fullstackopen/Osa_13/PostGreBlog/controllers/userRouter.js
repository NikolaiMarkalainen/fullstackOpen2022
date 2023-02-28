const router = require('express').Router()

const { User, Blog } = require('../models')

const userLookUp = async (req, res, next) => {
    req.user = await User.findByPk(req.params.id)
    next()
}

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include:{
        model: Blog,
        attributes: {exclude: ['userId']}
    }
  })
  if(users) res.json(users)
  else throw Error('No data')
})

router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    if(user) res.json(user)
    else throw Error('Bad data')
})

router.get('/:id', userLookUp, async (req, res) => {
  if (req.user) res.json(req.user)
  else throw Error('Not Found')
})

module.exports = router