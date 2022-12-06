import './App.css';
import { useEffect, useState} from 'react'
import listService from "./services/Protocols"
import BlogStructure from './components/BlogStructure';
const App = () =>{
  const [newTitle, setNewTitle] = useState([]);
  const [newLike, setNewLike] = useState(parseInt(0));
  const [newAuthor, setNewAuthor] = useState([]);
  const [newUrl, setNewUrl] = useState([]);
  const [blogs, setBlogs] = useState([])


  useEffect(() => {
    listService
    .getAll()
    .then(response=> {
      console.log("in app.js",blogs)

      setBlogs(response.data)
      console.log(response.data)
    })
    },[] )
  return(
    <div>
      <h1 className={"textCenter"}>Blogs</h1>
      <div>
          <BlogStructure
          newTitle = {newTitle}
          setNewTitle = {setNewTitle}
          newLike = {newLike}
          setNewLike = {setNewLike}
          newAuthor = {newAuthor}
          setNewAuthor = {setNewAuthor}
          newUrl = {newUrl}
          setNewUrl = {setNewUrl}
          blogs ={blogs}
          setBlogs = {setBlogs}
          />
      </div>
    </div>
  )
}


export default App;
