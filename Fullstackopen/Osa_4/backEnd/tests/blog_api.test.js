const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const { request, post } = require('../app')


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

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
        const URL = '/api/blogs'
        const TOKEN = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikxhc3RpcyIsImlkIjoiNjM5OWFhOWVjNTg4NWIxOWJlOTQyNzQzIiwiaWF0IjoxNjcxMjA1MjgyLCJleHAiOjE2NzEyMDg4ODJ9.7dxqDcRL1r6vzNszm_YKa1CIKQHtpYHxztC03CKkdjY"
        const newBlog = {
            title: "a new blog tditle",
            author: "a Veyr badasd author",
            url: "google.csom",
            like: 5,
            id: 123452678
        }
        const hook = (method = 'post') => (newBlog) =>
        supertest(URL)
        [method](newBlog)
        .set('Authorization', `Bearer ${TOKEN}`)
        .expect(401)
        .expect('Content-Type', /application\/json/);
        const response = await api.get('/api/blogs')
        const contents = response.body.map(blog => blog.title)
        expect(response.body).toHaveLength(contents.length)
        expect(contents).toContain(
            'a new blog tditle'
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

describe('An invalid blog', () => {
    test('missing variable', async() => {
        
        const URL = '/api/blogs'
        const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikxhc3RpcyIsImlkIjoiNjM5OWFhOWVjNTg4NWIxOWJlOTQyNzQzIiwiaWF0IjoxNjcxMjA1MjgyLCJleHAiOjE2NzEyMDg4ODJ9.7dxqDcRL1r6vzNszm_YKa1CIKQHtpYHxztC03CKkdjY"
        const newBlog = {
            title: "a new blog tditle",
            author: "someone",
            like: 5,
            id: 123452678
        }
        const hook = (method = 'post') => (newBlog) =>
        supertest(URL)
        [method](newBlog)
        .set('Authorization', `Bearer ${TOKEN}`)
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length)
    })
})

describe('Deleting a specific blog', () => {
    test('deletion', async() => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[1]
        const URL = '/api/blogs/'
        const TOKEN = " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikxhc3RpcyIsImlkIjoiNjM5OWFhOWVjNTg4NWIxOWJlOTQyNzQzIiwiaWF0IjoxNjcxMjA5MTE1LCJleHAiOjE2NzEyMTI3MTV9.Wk8x3sJfKbQj_VRhCxwMrJZJ79LYa_hG6YM4ASH62r0"
        const id = blogToDelete.id
        const hook = (method = 'delete') => (id) =>
        supertest(URL)
        [method](id)
        .set('Authorization', `Bearer ${TOKEN}`)
        .delete(`/api/blogs/${id}`)
        .expect(204)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
        const contents = blogsAtEnd.map(blog => blog.title)
        expect(contents).not.toContain(blogToDelete.title)
    })
})
describe('Updating like value of a blog', () => {
    test('Likes are updated', async() => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        blogToUpdate.like = 5
        await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        const blogsAtEnd = await helper.blogsInDb()
        const contents = blogsAtEnd.map(blog => blog.like)
        expect(contents).toContain(blogToUpdate.like)

    })
})

afterAll(() => {
    mongoose.connection.close()
})