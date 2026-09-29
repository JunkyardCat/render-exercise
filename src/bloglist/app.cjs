const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config.cjs')
const blogsRouter = require('./controllers/blogs.cjs')
const middleware = require('./utils/middleware.cjs')
const logger = require('./utils/logger.cjs')

const app = express()


const mongoUrl = config.MONGODB_URI
//mongoose.connect(mongoUrl,{family:4}).then(()=>console.log('connected')).catch(error=>console.log(error))
mongoose.connect(mongoUrl,{family:4}).then(()=>logger.info('connected')).catch(error=>logger.error(error))

app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs',blogsRouter)
app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)


module.exports = app
