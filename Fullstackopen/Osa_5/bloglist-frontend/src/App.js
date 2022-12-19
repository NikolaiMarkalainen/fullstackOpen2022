import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const Notification = (message) => {

}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLike, setNewLike] = useState('')
  

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
    setErrorMessage("Wrong credentials")
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
  
  const addBlog = (event) => {
      event.preventDefault()

      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        like: newLike
      }
      setBlogs(blogs.concat(blogObject))
      blogService
      .post(blogObject)
      .then(response => {
        setBlogs(blogs.concat(response.data))
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
        setNewLike('')
      })
  }

  const handleTitleChange = (event) => {
    event.preventDefault()
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    event.preventDefault()
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    event.preventDefault()
    setNewUrl(event.target.value)
  }
  const handleLikeChange = (event) => {
    event.preventDefault()
    setNewLike(event.target.value)
  }

  const BlogForm = () => (
    <form onSubmit = {addBlog}>
      <div>
        Title:
        <input value ={newTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        Author:
        <input value ={newAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        Url:
        <input value ={newUrl}
          onChange={handleUrlChange}
        />
      </div>
        <button type="submit">save</button>
    </form>
  )


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  return (
    <div>
     <h1>BLOGS</h1>
     <Notification message={errorMessage}/>
     {user === null ?
     loginForm() : 
    <div> 
      <p>{user.name} logged in</p>
      <button type="submit" onClick={handleLogout}>log out</button>
      <div>{BlogForm()}</div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
     </div>
     }
    </div>
  )
}

export default App
