import Togglable from "./Togglable"


const Blog = ({blog}) => (
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
      <button>Like</button>: {blog.likes}
    </div>
</Togglable>
  </ul>  
)

export default Blog