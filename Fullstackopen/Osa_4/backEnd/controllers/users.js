const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')


userRouter.post('/', async (request, response) => {
    const {username,name,password} = request.body
    const existingUser = await User.findOne({ username })
    if(existingUser || username.length < 4){
        return response.status(400).json({
            error: 'Username must be unique'
        })
    }
    if(password.length < 4 || password === undefined){
        return response.status(400).json({
            error: 'Password length must be over 3 charcaters long'
        })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

userRouter.get('/', async(request, response) => {
    const users = await User.find({}).populate('blogs', {title:1,author:1,url:1,likes:1})
    response.json(users)
})
module.exports = userRouter