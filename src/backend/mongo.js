const mongoose = require('mongoose')
if(process.argv.length<3){
  console.log('give password as argument')
}

//const pass = process.argv[2]
const url = ''

mongoose.set('strictQuery',false)
mongoose.connect(url,{family:4})

const personSchema = new mongoose.Schema({
  name:String,
  number:String
})

const Person = mongoose.model('Person',personSchema)

const person = new Person({
  name:'Albert Einstein',
  number:'123-0898'
})

person.save().then(result=>{
  console.log('person data saved')
  mongoose.connection.close()
})
