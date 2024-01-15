import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNewMessage('wrong username or password')
      setNotificationType('error')
      setTimeout(() => {
        setNewMessage(null);
      }, 5000)
    }
  }

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

  if (user === null) {
    return(
    <><h2>log in to application</h2>
    <Notification message={newMessage} notificationType={notificationType} />
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form></>
  )}

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={newMessage} notificationType={notificationType} />
      <p>{user.name} logged in</p>
      <button type="button" onClick={() => window.localStorage.clear()}>log out</button>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
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
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App