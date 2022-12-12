const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "a new blog tditle",
    author: "a Veyr badasd author",
    url: "google.csom",
    like: 523,
    id: 123452631238
  },
  {
    title: "a new blasdasdasog tditle",
    author: "a Veyr baddsadasasd author",
    url: "googldasdasdae.csom",
    like: 523,
    id: 12345262378
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: "a new blasdasdasog tditle",
    author: "a Veyr baddsadasasd author",
    url: "googldasdasdae.csom",
    like: 523,
     })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}