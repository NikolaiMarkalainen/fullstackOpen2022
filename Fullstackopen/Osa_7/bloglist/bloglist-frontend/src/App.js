import { useState, useEffect, useRef } from 'react'
import { connect, useDispatch } from 'react-redux'
import { addNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlogs, updateLike, removeBlog } from './reducers/blogReducer'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ConnectedNotifications from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import ConnectedUser from './components/Users'
import User from './components/User'
import './styles.css'
import{
 Routes, Route, Link, useMatch
} from 'react-router-dom'
  const padding = {
    padding: 5
  }

const App = (props) => {
  const match = useMatch('/users/:id')
  const foundUser = match
  ? props.users.find(user => user.id === match.params.id)
  : null


  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      props.addNotification('Wrong credentials',5000,'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    user.token = null
    window.localStorage.clear()
    window.location.reload()
  }

  const addBlog = (blogObject) => {
    props.createBlogs(blogObject, user.token)
    props.addNotification(`${blogObject.title} has been added`,5000,'add')

  }

  const blogFormRef = useRef()

  const handleBlogDelete = (id) => {
    const foundBlog = props.blogs.find((blog) => blog.id === id)
    var popUp = window.confirm(
      `Remove blog: ${foundBlog.title} by ${foundBlog.author}`
    )
    if (popUp) {
      props.removeBlog(foundBlog, user.token)
      props.addNotification(`Deleted ${foundBlog.title} by ${foundBlog.author}`,5000,'error')
    }
  }

  const handleBlogLike = (id) => {
    const clickedBlog = props.blogs.find(blog => blog.id === id)
    console.log(clickedBlog)
    props.updateLike(clickedBlog)
  }

  return (
      <div>
      <h1>BLOGS</h1>
      <ConnectedNotifications/>
      {user === null ? (
        <div>
          <Togglable buttonLabel="Login">
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
        </div>
      ) : (
        <div>
          <div>
          <Link style={padding} to ="/users/">Users</Link>
          <Link style={padding} to ="/">Home</Link>
          <Routes>
          <Route path='/users/:id' element={<User user={foundUser}/>}/>
              <Route path="/users/*" element={<ConnectedUser />}/>
          </Routes>
            <p>{user.username} logged in</p>
            <button id="log-out" type="submit" onClick={handleLogout}>
              log out
            </button>
            <Togglable buttonLabel="create new Blog" ref={blogFormRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable>
          </div>
          <div>
            {props.blogs.map((blog, id) => (
              <Blog
                key={id}
                blog={blog}
                user={user}
                blogUser={blog.user.username}
                addBlogLike={() => handleBlogLike(blog.id)}
                removeBlog={() => handleBlogDelete(blog.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


const mapStateToProps = (state) => {
  return{
    notification: state.notification,
    blogs: state.blogs,
    users: state.users
  }
}

const mapDispatchToProps = {
  addNotification,
  initializeBlogs,
  createBlogs,
  updateLike,
  removeBlog
}

const ConnectedRedux = connect(
  mapStateToProps, mapDispatchToProps)(App)




export default ConnectedRedux

           /* <Routes>
              <Route path="/users" element={<ConnectedUser />}/>
            </Routes>*/
/*            //<Link style={padding} to ="/users">Users</Link>

*/