const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.cjs')
const User = require('../models/user.cjs')

const api = supertest(app)

const initialUsers = [
  {
    username: "johnnybravo",
    password: "cartoon4lyf",
    name: "Jonny Bravo"
  }
]

beforeEach(async ()=>{
  await User.deleteMany({})
  await new User(initialUsers[0]).save()
})

test('retrieved all users', async ()=>{
  const users = await api.get('/api/users')
  assert.strictEqual(users.body.length,initialUsers.length)
})

test('add one user', async ()=>{
  const user = {
    username: "karljung",
    password: "karlisgood",
    name: "Karl Jung",
  }
  await api.post('/api/users').send(user).expect(201).expect('Content-Type',/application\/json/)
  const users = await api.get('/api/users')
  assert.strictEqual(users.body.length,initialUsers.length+1)
  assert.strictEqual(users.body[initialUsers.length].username==='karljung',true)
  //assert.strictEqual(users[initialUsers.length].password==='karljung')
})

test('add a user that is already existing', async ()=>{
  const user = {
    username: "johnnybravo",
    password: "cartoon4lyf",
    name: "Jonny Bravo",
  }
  const result = await api.post('/api/users').send(user).expect(400).expect('Content-Type',/application\/json/)
  const users = await api.get('/api/users')
  assert(result.body.error.includes('expected property to be unique'))
  assert.strictEqual(users.body.length,initialUsers.length)
  //assert.strictEqual(users[initialUsers.length].password==='karljung')
})

after(async ()=>{
  await mongoose.connection.close()
})

