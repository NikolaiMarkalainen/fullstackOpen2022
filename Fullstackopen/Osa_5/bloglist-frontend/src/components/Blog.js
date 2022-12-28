import { useState } from 'react'
const Blog = ({ blog, addBlogLike, removeBlog, userName }) => {
  const [visible,setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const [buttonText, setButtonText] = useState('Show more')


  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonText(buttonText === 'Show more' ? 'Show less' : 'Show more')
  }
  const deleteButton = () => {
    if(blog.user.username === userName){
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
      <button onClick={toggleVisibility}>{buttonText}</button>
      <div style={showWhenVisible}>
        <div>
        Url: {blog.url}
          <br></br>
          <button
            onClick = {addBlogLike}>LIKE</button>
          <b>Likes:</b> {blog.like}
          <br></br>
          <div>
            {blog.user.username}
          </div>
          <br></br>
          {deleteButton()}
          <br></br>
        </div>
      </div>
    </ul>
  )
}
export default Blog