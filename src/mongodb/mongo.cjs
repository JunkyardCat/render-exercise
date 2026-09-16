
const mongoose = require('mongoose')
const dns = require('dns')
dns.setServers(['8.8.8.8'])

if(process.argv.length<3){
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const val1 = process.argv[3]
const val2 = process.argv[4]

const url =`mongodb+srv://exercise:${password}@cluster0.nrwrzim.mongodb.net/phoneApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set('strictQuery',false)

mongoose.connect(url,{family:4})

const pbSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const PhoneBook = mongoose.model('PhoneBook',pbSchema)

const phonebook = new PhoneBook({
  name:val1,
  number:val2
});

if(val1 && val2){
  phonebook.save().then(result=>{
   console.log(`added ${val1} number ${val2} to phonebook`)
   mongoose.connection.close()
  })
}else{
PhoneBook.find({}).then(result=>{
  result.forEach(phone=>{
    console.log(phone)
  })
  mongoose.connection.close()
})
}


