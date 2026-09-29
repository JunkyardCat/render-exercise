const blogsRouter = require('express').Router()
const Blog = require('../models/blog.cjs')
//const {errorHandler} = require('../utils/middleware')

blogsRouter.get('/',(req,res)=>{
  Blog.find({}).then(result=>res.json(result))
})

blogsRouter.get('/:id',(req,res,next)=>{

  Blog.findById(req.params.id).then(result=>{
    if(result){
      res.json(result)
    }else{
      res.status(404).end()
    }
  }
  ).catch(error=>{
    next(error)
  })
})

blogsRouter.post('/',(req,res,next)=>{
  const blog = new Blog(req.body)
  blog.save().then(result => {res.status(201).json(result)}).catch(error=>next(error))
})

blogsRouter.delete('/:id',(req,res,next)=>{
  Blog.findByIdAndDelete(req.params.id).then(()=>{
    res.status(204).end()
  }).catch(error=>next(error))
})

blogsRouter.put('/:id',(req,res,next)=>{
  const data = req.body
  
  Blog.findByIdAndUpdate(req.params.id,req.body).then(()=>{
    res.send('success')
  }).catch(error => next(error))
  
  //res.send("hello inside put")
})

module.exports = blogsRouter
