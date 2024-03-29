const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	response.json(blog)
})

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
	  return authorization.replace('Bearer ', '')
	}
	return null
  }

blogsRouter.post('/', async (request, response) => {
	const { title, author, url, likes } = request.body;
	const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token invalid' })
	}
	const user = await User.findById(decodedToken.id)

	const blog = new Blog({ title, author, url, likes, user: user._id });

	const savedBlog = await blog.save();
	user.blogs.push(savedBlog._id);
	await user.save();

	response.status(201).json(savedBlog);
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id);
  	response.status(204).end();
})

module.exports = blogsRouter