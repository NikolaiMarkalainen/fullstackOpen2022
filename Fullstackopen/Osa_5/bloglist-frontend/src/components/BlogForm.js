import { useState } from 'react'
import blogService from '../services/blogs'
import '../styles.css'
import Notification from './Notification'
const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newMessage, setNewMessage] = useState('')


const addBlog = (event) => {
    event.preventDefault()
    const val = 0
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      like: val
    }
    console.log("blogOBJECT",blogObject)
    setNewBlog(newBlog.concat(blogObject))
    blogService
    .post(blogObject)
    .then(response => {
      setNewBlog(newBlog.concat(response.data))
      setNewMessage(<div className={"add"}>new blog: {newTitle} by {newAuthor} has been added</div>)
      setNewAuthor('')
      setNewTitle('')
      setNewUrl('') 
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



return(
<form onSubmit = {addBlog}>
    <Notification message={newMessage}/>
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
}
export default BlogForm