const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there are some blogs in database', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('those are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('those are identified by field id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

      expect(response.body[0].id).toBeDefined()
  })

  test('a blog can be deleted', async () => {
    const aBlogAtStart = (await helper.blogsInDb())[0]

    await api
      .delete(`/api/blogs/${aBlogAtStart.id}`)
      .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(b => b.title)
      expect(titles).not.toContain(aBlogAtStart.title)
  })

  test('a blog can be edited', async () => {
    const aBlogAtStart = (await helper.blogsInDb())[0]
    const editedBlog = {
      ...aBlogAtStart,
      likes: 99
    }

    await api
      .put(`/api/blogs/${aBlogAtStart.id}`)
      .send(editedBlog)
      .expect(200)