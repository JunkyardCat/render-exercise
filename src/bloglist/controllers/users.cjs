const User = require('../models/user.cjs')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

usersRouter.get('/',async (req,res)=>{
  console.log('hello')

  const body = await User.find({})
  res.send(body)
})

usersRouter.post('/',async (req,res,next)=>{
  try{
    const {username,name, password} = req.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    //console.log(username,password)
    const user = new User({
      username,
      name,
      passwordHash
    })
    //console.log(user)
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  }catch(error){
    next(error)
  }
})


module.exports = usersRouter
