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
  
  const addBlog = () => {

  }

  const handleBlogChange = () => {

  }


  const blogForm = () => {
    <form onSubmit = {addBlog}>
      <input
        value ={newBlog}
        onChange={handleBlogChange}
      />
      <button type="submit">save</button>
    </form>
  }


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
      {blogForm()}
      {console.log("in logged in")}
      <button type="submit" onClick={handleLogout}>log out</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
     </div>
     }
    </div>
  )
}

export default App
