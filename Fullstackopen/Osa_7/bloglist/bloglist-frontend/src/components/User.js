const User = ({ user }) => {
    if(!user){
        return null
    }
    console.log('IN USER', user)
    const blogs = user.blogs
    console.log(blogs)
    return(
        <div>
            <h1>{user.username}</h1>
            <h2>Added blogs</h2>
            <div>
                <ul>
                {blogs.map(blog =>
                    <li key={blog.id}>{blog.title}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default User