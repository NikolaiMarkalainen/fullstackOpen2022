import listService from "../services/Protocols"
import "../App.css"

const BlogStructure = ({newTitle, setNewTitle,
    newLike,setNewLike,newAuthor,setNewAuthor,
    newUrl,setNewUrl, blogs, setBlogs}) => {
      
      const handleTitleChange = (event) => {
        setNewTitle(event.target.value);
      }
    
      const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value);
      }
    
      const handleUrlChange = (event, likeButton) => {
        event.preventDefault()
        setNewUrl(event.target.value)
      }

      const handleBlogDelete = (event, deleteButton) => {
        event.preventDefault()
        console.log("delete")
        console.log(deleteButton)
        console.log(blogs[deleteButton])
        console.log(blogs)
        listService
        .remove(deleteButton.id)
        .then(response => {
          setBlogs(blogs.concat(response.data))
          window.location.reload()
        })
      }
      const handleBlogLike = (event, click) => {
        event.preventDefault()
        click.like = click.like + 1 
        newLike = click.like

        //create a function that checks if the
        //blog array has specific id so that
        //i can change that id's like value
        // to +1 once clicked
        const foundBlog = blogs.find(blog => blog.id === click.id)
        const id = foundBlog.id
      
        console.log("click.like",click.like)
        setNewLike(newLike)
        console.log(newLike)
        // to create a valid object i have to
        // update the dataset with all the needed
        //functions as i couldnt find a way to
        // update only likes so i bring in blog object
        
        const blogObject = {
          title: foundBlog.title, 
          author: foundBlog.author,
          url: foundBlog.url,
          like: newLike
        }
        console.log(blogObject)
        listService
        .update(id, blogObject)
        .then(response => {
          console.log(response)
          console.log("listservice")
          setBlogs(blogs.map(blog => blog.id !== id ? blog : response.data))
        })
        
        
      }
      /*
      Add blog will create the blog we want for it
      to display
      */
      const addBlog = (event) => {
        event.preventDefault();
        const blogObject = {
          title: newTitle, 
          author: newAuthor,
          url: newUrl,
          like: newLike
        }
        /*
        Works properly once setting up services properly
        the database with id applied to it it cant be null 
        has to have a value
        */
        setBlogs(blogs.concat(blogObject))
        console.log(blogs)
        listService
        .post(blogObject)
        .then(response => {
          setBlogs(blogs.concat(response.data))
          setNewAuthor('')
          setNewTitle('')
          setNewUrl('')
          setNewLike(0)
        })   
      }
    
      /* 
      in the return we manage the form display and
      the methods used for its display
      after the click we move to addPerson
      */
       return(
          <div>
            <form onSubmit = {addBlog}>
            <div className = 'inputField'> 
            Blog Title
              <div>
              <input value = {newTitle}
                onChange = {handleTitleChange}/>
              </div>
              <div>
                Blog Author
              </div>

              <div>
              <input value = {newAuthor}
                onChange = {handleAuthorChange}/> 
              </div>
              <div>
                Blog URL
              </div>
              <div>
              <input value = {newUrl}
                onChange = {handleUrlChange}/>
              </div>
              </div> 
              <div className='inputAdd'>
                <button type="submit">ADD</button>
              </div>
            </form>
          <div className="blogBody">
            {blogs.map((blog, index) => (
              <div key={index}>
                <div> 
                  <div>   
                  Title: <i><b><u>{blog.title}</u></b></i>
                  <br></br>
                  Author:  <i><b>{blog.author}</b></i>
                  <br></br>
                  URL: <strong>{blog.url} </strong>
                  <br></br>
                  </div>
                  <div className="buttons">
                    <button value = {newLike}
                    onClick = {e => handleBlogLike(e, blog)}>Like</button>
                    :{blog.like}
                    <button type="submit"
                    onClick = {e => handleBlogDelete(e, blog)}>Delete</button>
                  </div>
              </div>  
             <br></br>
            </div>
            ))}
          </div>
          </div>
    
          
        )
    
    }

    export default BlogStructure