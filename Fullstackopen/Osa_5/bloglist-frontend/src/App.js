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
     <Togglable buttonLabel='Log in'>
      <LoginForm 
      username = {username}
      password = {password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit ={handleLogin}
      /> 
     </Togglable>
     : 
    <div> 
      <p>{user.name} logged in</p>
      <button type="submit" onClick={handleLogout}>log out</button>
      <Togglable buttonLabel ="create new Blog" ref={blogFormRef}>
      <BlogForm creatBlog ={addBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
     </div>
     }
    </div>
  )
}

export default App
