const router = require('express').Router()

const { User, Blog, Readinglists} = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include:{
        model: Blog,
        attributes: {exclude: ['userId']}
    },
  })
  if(users) res.json(users)
  else throw Error('No data')
})

router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    if(user) res.json(user)
    else throw Error('Bad data')
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: {exclude: ['']} ,
    include:[{
      model: Blog,
      as: 'readings',
      attributes: {exclude: ['userId']},
      through: {
        attributes: ['read', 'id']
      },
    }
  ]
  })
  if (user) res.json(user)
  else throw Error('Not Found')
})

module.exports = router