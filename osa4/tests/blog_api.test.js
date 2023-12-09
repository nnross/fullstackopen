const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const listWithManyBlogs = [
    {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
    },
    {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
    },
    {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
    },
    {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
    },
    {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
    },
    {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
    }  
]

beforeEach(async () => {  
    await Blog.deleteMany({})
  
    const blogObjects = listWithManyBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

describe('blog api tests', () => {
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })
    test('all blogs are returned', async () => {
       const response = await api.get('/api/blogs')

       expect(response.body).toHaveLength(listWithManyBlogs.length)
    })
    test('identifier field is called id', async () => {
        const blog = (await api.get('/api/blogs')).body[0];
        expect(blog._id).toBeUndefined();
        expect(blog.id).toBeDefined();
    })
    test('blogs can be added with HTTP POST', async () => {
        const response = await api.get('/api/blogs')
        const length = listWithManyBlogs.length
        const newBlog = {
            title: 'Test title',
            author: 'Test Author',
            url: 'https://testblog.com/blog'
        }

        expect(response.body).toHaveLength(length)
        await api.post('/api/blogs').send(newBlog).expect(201)
        const response2 = await api.get('/api/blogs')
        expect(response2.body).toHaveLength(length+1)
    })
    test('blog can be deleted with HTTP DELETE', async () => {
        const id = (await Blog.findOne({})).id
        await api.delete(`/api/blogs/${id}`).expect(204)
        expect((listWithManyBlogs).map((blog) => blog.id)).not.toContain(id)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
  })