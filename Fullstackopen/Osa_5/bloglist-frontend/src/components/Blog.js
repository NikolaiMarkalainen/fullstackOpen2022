import { useState } from 'react'
const Blog = ({ blog, addBlogLike, removeBlog, user }) => {
  const [visible,setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const [buttonText, setButtonText] = useState('Show more')


  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonText(buttonText === 'Show more' ? 'Show less' : 'Show more')
  }
  const deleteButton = () => {
    if(blog.user.username === user.username){
      return(
        <button
          onClick = {removeBlog}>Delete</button>
      )
    }
  }

  return(
    <ul>
      <li className="blog">
        {blog.title}, {blog.author}
      </li>
      <button onClick={toggleVisibility}>
        {buttonText}
      </button>
      <div style={showWhenVisible}>
        <div>
          <div className='url-info'>
            Url: {blog.url}
          </div>
          <div className='like-info'>
            <button
              onClick = {addBlogLike}>LIKE</button>
            <div className='likes-data'>
              {blog.like}
            </div>
          </div>
          <div className='user-info'>
            Creator: {user.username}
          </div>
          <div className='delete-button'>
            {deleteButton()}
          </div>
        </div>
      </div>
    </ul>
  )
}
export default Blog