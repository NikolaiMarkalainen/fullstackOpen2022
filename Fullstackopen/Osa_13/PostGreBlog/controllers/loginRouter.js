const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const {User, Session} = require('../models')
const { isAdmin, tokenExtractor } = require('../util/middleware')


router.put('/:username', tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  })

  if (user) {
    user.disabled = req.body.disabled
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  if(user.disabled){
    return response.status(400).json({
      error: 'account disabled, please contact admin' 
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(
    userForToken, 
    SECRET
    )

    await Session.create({
      userId: user.id,
      token: token,
    })
  

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

router.delete('/', tokenExtractor, async ( request, response ) => {
    const token = request.token
    console.log(token)
    const session = await Session.findOne({ where: { token }})

    if(!session) return response.status(400).json({ error: 'Session not found' })

    await session.destroy()

    response.status(204).end()
  })
module.exports = router