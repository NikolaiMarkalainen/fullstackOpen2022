import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blogs = ({ blogFormRef,addBlog,handleBlogDelete,handleBlogLike, blogs, user }) => {

return(
    <div>
        <Togglable buttonLabel="create new Blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
        </Togglable>
        {blogs.map((blog, id) => (
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
)

}


export default Blogs