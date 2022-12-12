const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


describe('Fetching Blogs', () => {
    test('blogs returned as json', async() => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
})
describe('Checking if id is correct', () => {
    test('id not _id', async() => {
        const response = await api.get('/api/blogs')
        console.log(response.body)
        const contents = response.body.map(blog => blog.id)
        console.log(contents)
        expect(contents).toBeDefined()
        expect("id" in contents)
    })
})


afterAll(() => {
    mongoose.connection.close()
})