import { useState } from 'react'
const Blog = ({ blog, addBlogLike, removeBlog, user }) => {
  const [visible,setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const [buttonText, setButtonText] = useState('Show more')


  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonText(buttonText === 'Show more' ? 'Show less' : 'Show more')
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
          <br></br>
          {user}
          <br></br>
          <button
            onClick = {removeBlog}>Delete</button>
        </div>
      </div>
    </ul>
  )
}
export default Blog