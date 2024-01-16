import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setNewMessage, setNotificationType }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [toggleBlog, setToggleBlog] = useState(false)

  const handleNewBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = blogService.create({title: title, author: author, url: url})
      setNewMessage(`a new blog ${title} by ${author} was added`)
      setNotificationType('add')
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    } catch (exception) {
      setNewMessage('failed to add blog')
      setNotificationType('error')
      setTimeout(() => {
        setNewMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
    { toggleBlog === false ? (<button type="button" onClick={() => setToggleBlog(true)}>new note</button>) :
    (<form onSubmit={handleNewBlog}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">create</button>
      <button type="submit" onClick={() => setToggleBlog(false)}>cancel</button>
      </form>)
    }
    </div>)
}

export default BlogForm