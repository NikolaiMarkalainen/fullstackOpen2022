const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')


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

describe('A blog can be added', () => {
    test('valid post', async() => {
        const newBlog = {
            title: "a new blog tditle",
            author: "a Veyr badasd author",
            url: "google.csom",
            like: 5,
            id: 123452678
        }
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const contents = response.body.map(blog => blog.title)
        expect(response.body).toHaveLength(contents.length)
        expect(contents).toContain(
            'a new blog title'
        )
    })
})

describe('Blog has like value', () => {
    test('0 likes', async() => {
        const response = await api.get('/api/blogs')
        const contents = response.body.map(blog => blog.like)
        expect(contents !== undefined)
    })
})


afterAll(() => {
    mongoose.connection.close()
})