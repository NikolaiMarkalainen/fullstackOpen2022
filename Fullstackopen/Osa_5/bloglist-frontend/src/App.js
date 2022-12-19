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
  const handleLogin = async (event) => {
    event.preventDefault()
  
  try{
    const user = await loginService.login({
      username,password,
    })
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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

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
     </div>
     }
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
