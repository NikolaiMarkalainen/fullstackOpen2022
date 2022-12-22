import Togglable from './Togglable'


const Blog = ({ blog, addBlogLike, removeBlog }) => {


  return(
    <ul>
      <li>
      Title: {blog.title}
      </li>
      <Togglable buttonLabel="Show Details">
        <div>
      Author: {blog.author}
          <br></br>
      Url: {blog.url}
          <br></br>
          <button
            onClick = {addBlogLike}>Like</button>
      :{blog.like}
          <br></br>
          <button
            onClick = {removeBlog}>Delete</button>
        </div>
      </Togglable>
    </ul>
  )
}
export default Blog