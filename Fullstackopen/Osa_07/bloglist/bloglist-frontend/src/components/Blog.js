import { Link } from 'react-router-dom'
const Blog = ({ blog, addBlogLike, removeBlog, user }) => {


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
        <Link to={`/blogs/${blog.id}`}>
        {blog.title}, {blog.author}</Link>
      </li>
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
    </ul>
  )
}
export default Blog
