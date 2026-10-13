const router = require('express').Router()
const jwt = require('jsonwebtoken')
const {SECRET} = require('../util/config.cjs')
const {Op} = require('sequelize')

const {tokenExtractor} = require('../util/middleware.cjs')

const {Note,User} = require('../models/index.cjs')

const noteFinder = async(req,res,next)=>{
  req.note = await Note.findByPk(req.params.id)
  if(!req.note){
    return res.status(404).end()
  }
  next()
}

router.get('/',async(req,res)=>{
  const where = {}
  if(req.query.important){
    where.important = req.query.important === "true"
  }
  if(req.query.search){
    where.content = {
      [Op.substring]: req.query.search
    }
  }
  const notes = await Note.findAll({
    attributes:{exclude:['userId']},
    include:{
      model:User,
      attributes:['name']
    },
    where
  })
  res.json(notes)
})

router.get('/:id',noteFinder,async(req,res)=>{
  res.json(req.note)
})

router.post('/',tokenExtractor,async(req,res)=>{
  //console.log(req.body)
  try{
    const user = await User.findByPk(req.decodedToken.id)
    const note = await Note.create({...req.body, date: new Date(),userId:user.id})
    res.json(note)
  }catch(error){
    return res.status(400).json({error})
  }
})

router.put('/:id', async(req,res)=>{
  req.note.important = req.body.important
  await req.note.save()
  res.json(req.note)
})

router.delete('/:id',noteFinder,async (req,res)=>{
  await req.note.destroy()
  res.status(204).end()
})

module.exports = router
