const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
describe('When there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user =  new User({username: 'root', passwordHash})
        await user.save()
    })
    
    test('creation succeeds with fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'Lastis',
            name: 'Nikolai Markalainen',
            password: 'saalalalal'
        }
        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        expect (usersAtEnd).toHaveLength(usersAtStart.length + 1)
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper status code and message if username taken', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'root',
            name: 'Nikolai Markalainen',
            password: 'saalalalal'
        }
        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('Username must be unique')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
        console.log(usersAtEnd)
    })
})