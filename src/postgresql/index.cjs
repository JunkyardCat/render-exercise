const express = require('express')
const app = express()
const {PORT} = require('./util/config.cjs')
const {connectToDatabase} = require('./util/db.cjs')
const notesRouter = require('./controllers/notes.cjs')
const userRouter = require('./controllers/users.cjs')
const loginRouter = require('./controllers/login.cjs')

app.use(express.json())

app.use('/api/notes',notesRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)

const start = async ()=>{
  await connectToDatabase()
  app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
  })
}

start()
