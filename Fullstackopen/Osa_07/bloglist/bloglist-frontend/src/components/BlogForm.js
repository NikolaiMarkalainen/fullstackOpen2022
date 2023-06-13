import { useState } from 'react'
import '../styles.css'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const val = 0
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      like: val,
    })
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  const handleTitleChange = (event) => {
    event.preventDefault()
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    event.preventDefault()
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    event.preventDefault()
    setNewUrl(event.target.value)
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        Title:
        <input
          value={newTitle}
          onChange={handleTitleChange}
          placeholder="blog-title"
          id="blog-title"
        />
      </div>
      <div>
        Author:
        <input
          value={newAuthor}
          onChange={handleAuthorChange}
          placeholder="blog-author"
          id="blog-author"
        />
      </div>
      <div>
        Url:
        <input
          value={newUrl}
          onChange={handleUrlChange}
          placeholder="blog-url"
          id="blog-url"
        />
      </div>
      <button id="submit-button" type="submit">
        save
      </button>
    </form>
  )
}
export default BlogForm
