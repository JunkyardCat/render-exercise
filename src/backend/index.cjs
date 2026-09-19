const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const PhoneBook = require('./models/person.cjs')

//const dns = require('dns')
//dns.setServers(['8.8.8.8','1.1.1.1'])

const app = express()

app.use(express.static('dist'))
app.use(express.json())
//app.use(morgan('tiny',(req,res)=>{return req.data}))
app.use(morgan((tokens,req,res)=>{
	//console.log(req)
	return [
		tokens.method(req,res),
		tokens.url(req,res),
		tokens.status(req,res),
		tokens.res(req,res,'content-length'), '-',
		tokens['response-time'](req,res),'ms',
		JSON.stringify(req.body)
].join(' ')})
)
app.use(cors())



/*
let persondata = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
*/

const errorHandler = (error,request,response,next)=>{
  console.log(error.message)
  console.log("inside error Handler")
  if(error.name==='CastError'){
    return response.status(400).send({error:'malformatted id'})
  }else if(error.name==='ValidationError'){
    return response.status(400).json({error:error.message})
  }
  next(error)
}

app.get('/',(request,response)=>{
  console.log("hello world")
})


app.get('/api/persons',(request,response)=>{
  //console.log(password)
	//response.send(persondata)
  console.log('inside the /')
  //const temp =[]
  PhoneBook.find({}).then(result=>{
    console.log(result)
    response.send(result)
    persondata=result
    
    //mongoose.connection.close()
  })
  //response.send(temp)


})

app.get('/api/persons/:id',(request,response,next)=>{
	console.log("what is happening")
	console.log(request.params.id)
	//console.log(request.params)
	//console.log(request)
	//const temp = persondata.find(n=>n.id===request.params.id)
  PhoneBook.findById(request.params.id).then(data=>{
    if(data){
      console.log("data is not false",data)
      response.send(data)
    }else{
      response.status(404).end()
    }
  }).catch(error=>next(error))
	//response.send(temp)
})

app.delete('/api/persons/:id',(request,response)=>{
  console.log("here in index.cjs delete",request.params.id)
  PhoneBook.findByIdAndDelete(request.params.id).then(result=>{
    console.log("finddeleteresult",result)
    response.status(200).json(result)
  })
	persondata = persondata.filter(n=>n.id!==request.params.id)

	//response.status(204).end()
})

app.post('/api/persons',(request,response,next)=>{
	const body=request.body
	//console.log(body)
	//console.log("im here")
	//body.id=String(Math.floor(Math.random()*(100-5+1)+5))
	//console.log(body)
  console.log("backend post body id",body.id)
	if(!body.name || !body.number){
		return response.status(400).json({error:"no name or number"})
	}
  /*
	const found=persondata.find(n=>n.name===body.name)
	if(found){
		return response.status(400).json({error:"already exists"})
	}
  */
  const phonebook = new PhoneBook({
    name:body.name,
    number:body.number
  })
  phonebook.save().then(result=>{
    console.log("saved to mongodb success")
    response.json(result)
  }).catch(error=>{
    next(error)

    //console.log(error)
  })

	//persondata=persondata.concat(body)
	//response.json(body)
})

app.put('/api/persons/:id',(request,response,next)=>{
	console.log("im in put backend===")
	console.log("put backend",request.body,request.body.number)
	//persondata=persondata.map(n=>n.id===request.params.id?{name:request.body.name,number:request.body.number,id:request.params.id}:n)
  PhoneBook.findById(request.params.id).then(data=>{
    console.log("findById",data)
    const {name,number} = request.body
    if(!data){
      return response.status(404).end()
    }
    data.name=name
    data.number=number
    return data.save().then(n=>response.json(n))

  }).catch(error => next(error))
	//return response.json(request.body)
})

app.get('/info',(request,response)=>{
	console.log(response)
	const temp = persondata.length
	const tempDate = Date.now()
	const now = new Date()
	const fullDate = now.getFullYear()
	response.send(`Phonebook has info for ${temp} people <br> ${now.toJSON()}`)
})

app.use(errorHandler)


const PORT=3001

mongoose.connection.once('open',()=>{
app.listen(PORT,()=>{
	console.log(`running on PORT ${PORT}`)
})
})

