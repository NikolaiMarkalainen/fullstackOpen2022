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
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
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


  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        
      })
  }

  const blogFormRef = useRef()

  const handleBlogLike = id => {
    console.log(blogs)
    console.log("clicked", id)
    const foundBlog = blogs.find(blog => blog.id === id)
    console.log("foundBlog",foundBlog)
    foundBlog.like = foundBlog.like + 1
    const changedBlog = { ...foundBlog, like: foundBlog.like, user: foundBlog.user.id}
    blogService
    .update(id, changedBlog)
    .then(returnedBlog => {
      setBlogs(blogs.map(blog => blog.id !== id ? blog: returnedBlog))
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
    setErrorMessage(<div className={"error"}>Wrong credentials</div>)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  }
  

  const handleLogout = async (event) =>{
    event.preventDefault()
    user.token = null
    window.localStorage.clear()
    window.location.reload()
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
      <p>{user.name} logged in</p>
      <button type="submit" onClick={handleLogout}>log out</button>
      <Togglable buttonLabel ="create new Blog" ref={blogFormRef}>
        <BlogForm createBlog =  {addBlog}/>
      </Togglable>
      </div>
      <div>
      {blogs.map(blog =>(
        <Blog 
          key={blog.id} 
          blog={blog} 
          addBlogLike={() => handleBlogLike(blog.id)} 
          />
      ))}
        </div>
      </div>
     }
    </div>
  )
}

export default App
/*
  console.log("here")
    event.preventDefault()
    console.log(click)
    click.like = click.like + 1 
    console.log(click.like)
    const foundBlog = blogs.find(blog => blog.id === click.id)
    console.log(foundBlog)
    const id = foundBlog.id
    const userid = foundBlog.user.id
    setNewLike(click.like)
    const blogObject = {
      title: foundBlog.title, 
      author: foundBlog.author,
      url: foundBlog.url,
      like: click.like,
      user: foundBlog.user.id
    }
    console.log(id)
    console.log(userid)
    blogService
    .update(id, blogObject)
    .then(response => {
      console.log(response)

      setBlogs(blogs.map(blog => blog.id !== id ? blog : response.data))
    })

    console.log("With updated value",foundBlog)
  }
  */