import { useState } from 'react'
const Blog = ({ blog, addBlogLike, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const [buttonText, setButtonText] = useState('Show more')

  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonText(buttonText === 'Show more' ? 'Show less' : 'Show more')
  }
  const deleteButton = () => {
    if (blog.user.username === user.username) {
      return (
        <button id="delete-button" onClick={removeBlog}>
          Delete
        </button>
      )
    }
  }

  return (
    <ul id="blog-data">
      <li className="blog">
        {blog.title}, {blog.author}
        <button onClick={toggleVisibility}>{buttonText}</button>
      </li>
      <div style={showWhenVisible}>
        <div>
          <div className="url-info">Url: {blog.url}</div>
          <div className="like-info">
            <button id="like-button" onClick={addBlogLike}>
              LIKE
            </button>
            <div className="likes-data">{blog.like}</div>
          </div>
          <div className="user-info">Creator: {blog.user.username}</div>
          <div>{deleteButton()}</div>
        </div>
      </div>
    </ul>
  )
}
export default Blog
