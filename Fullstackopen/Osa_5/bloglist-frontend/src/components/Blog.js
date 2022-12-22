import Togglable from './Togglable'

const Blog = ({ blog, addBlogLike, removeBlog, user }) => {

  return(
    <ul>
      <li className="blog">
        {blog.title}, {blog.author}
      </li>
      <Togglable buttonLabel="Show Details">
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
      </Togglable>
    </ul>
  )
}
export default Blog