const SingleBlogView = ({ blog, handleBlogLike }) => {
    if(!blog){
        return null
    }
    console.log('IN SINGLE BLOG', blog)
    console.log(blog)
    return(
        <div>
            <h2>{blog.title}</h2>
            {blog.url}
            <div>{blog.like} <button onClick={ () => handleBlogLike(blog.id)}>like</button></div>
        </div>
    )
}

export default SingleBlogView