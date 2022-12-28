import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import './styles.css'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const filterBlogs = () => {
    blogs.sort((a,b) => {
      return b.like - a.like
    })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username,password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch (exception){
      setErrorMessage(<div className={'error'}>Wrong credentials</div>)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    user.token = null
    window.localStorage.clear()
    window.location.reload()
  }


  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .post(blogObject)
      .then(response => {
        setBlogs((blogs) => [...blogs, response.data])
      })
      .then(setErrorMessage(<div className={'add'}>{blogObject.title} has been added</div>))
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const blogFormRef = useRef()

  const handleBlogDelete = id => {
    const foundBlog = blogs.find(blog => blog.id === id)
    if(window.confirm(`Remove blog: ${foundBlog.title} by ${foundBlog.author}`)){
      blogService
        .remove(id)
        .then(() => {
          setBlogs((blogs) => blogs.filter((blog) => blog.id !== foundBlog.id))
        })
        .then(setErrorMessage(<div className={'error'}>Deleted, {foundBlog.title} by {foundBlog.author}</div>))
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleBlogLike = id => {
    console.log(blogs)
    console.log('clicked', id)
    const foundBlog = blogs.find(blog => blog.id === id)
    console.log('foundBlog',foundBlog)
    foundBlog.like = foundBlog.like + 1
    const changedBlog = { ...foundBlog, like: foundBlog.like, user: foundBlog.user.id }
    blogService
      .update(id, changedBlog)
      .then(newBlog => {
        console.log(newBlog)
        setBlogs(blogs.map(blog => blog.id !== id ? blog: newBlog))
      })
  }

  return (
    <div>
      <h1>BLOGS</h1>
      <Notification message={errorMessage}/>
      {user === null ?
        <div>
          <Togglable buttonLabel='Log in'>
            <LoginForm
              username = {username}
              password = {password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit ={handleLogin}
            />
          </Togglable>
        </div>
        :
        <div>
          <div>
            <p>{user.username} logged in</p>
            <button type="submit" onClick={handleLogout}>log out</button>
            <Togglable buttonLabel ="create new Blog" ref={blogFormRef}>
              <BlogForm createBlog =  {addBlog}/>
            </Togglable>
          </div>
          <div>

            {filterBlogs()}
            {blogs.map((blog, id) => (
              <Blog
                key={id}
                blog={blog}
                user={user}
                blogUser={blog.user.username}
                addBlogLike={() => handleBlogLike(blog.id)}
                removeBlog = {() => handleBlogDelete(blog.id)}
              />
            ))}
          </div>
        </div>
      }
    </div>
  )
}

export default App
