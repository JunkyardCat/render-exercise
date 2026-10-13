const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.cjs')
const Blog = require('../models/blog.cjs')

const api = supertest(app)

  
const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }  
]

beforeEach(async ()=>{
  await Blog.deleteMany({})

  for(const blog of initialBlogs){
    await new Blog(blog).save()
  }

})

test('retrieved all blogs',async ()=>{
  const blogs = await api.get('/api/blogs')
  assert.strictEqual(blogs.body.length,initialBlogs.length)
})

test('id is returned',async ()=>{
  const blogs = await api.get('/api/blogs')
  const blog = blogs.body[0]
  assert.ok(blog.id!==undefined)
})

test('create a new blog and verify it exists',async ()=>{
  const blog = {
    title: "hello",
    author: "jack frost",
    url: "http://google.com",
    likes: 4,
  }
  await api.post('/api/blogs').send(blog).expect(201).expect('Content-Type', /application\/json/)
  const response = await api.get(`/api/blogs`)
  const content = response.body.map(e=>e.title)
  assert.strictEqual(content.includes('hello'),true)
})


test('create a new blog with missing like. should default to 0 like',async ()=>{
  const blog = {
    title: "hello",
    author: "jack frost",
    url: "http://google.com",
  }
  await api.post('/api/blogs').send(blog).expect(201).expect('Content-Type', /application\/json/)
  const response = await api.get(`/api/blogs`)
  const content = response.body.filter(e=>e.title==='hello')
  assert.strictEqual(content[0].likes,0)
})


test('create a new blog without title or url',async ()=>{
  const blog = {
    author: "jack frost",
    url: "http://google.com",
    likes: 4,
  }
  const blog2 = {
    title: "hello",
    author: "jack frost",
    likes: 4,
  }

  await api.post('/api/blogs').send(blog).expect(400)
  await api.post('/api/blogs').send(blog2).expect(400)
})

test('delete a single blog',async ()=>{
  const blogs = await api.get('/api/blogs')
  const id = blogs.body[0].id
  console.log(id)
  await api.delete(`/api/blogs/${id}`).expect(204)
})

test('update a single blog',async ()=>{
  const blogs = await api.get('/api/blogs')
  const id = blogs.body[0].id
  console.log(id)
  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 100,
  }

  await api.put(`/api/blogs/${id}`).send(blog).expect('success')
  //const check = await api.get(`/api/blogs/${id}`)
  //console.log(check.body)
  
})


test('blogs are returned as json', async ()=>{
    await api.get('/api/blogs').expect(200).expect('Content-Type',/application\/json/)
})

after(async ()=>{
  await mongoose.connection.close()
})
