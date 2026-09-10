const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
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

app.get('/',(request,response)=>{
	response.send('<h1>Hello World</h1>')
})

app.get('/api/persons',(request,response)=>{
	response.send(persondata)
})

app.get('/api/persons/:id',(request,response)=>{
	console.log("what is happening")
	console.log(request.params.id)
	//console.log(request.params)
	//console.log(request)
	const temp = persondata.find(n=>n.id===request.params.id)
	response.send(temp)
})

app.delete('/api/persons/:id',(request,response)=>{
	persondata = persondata.filter(n=>n.id!==request.params.id)
	response.status(204).end()
})

app.post('/api/persons',(request,response)=>{
	const body=request.body
	//console.log(body)
	//console.log("im here")
	body.id=String(Math.floor(Math.random()*(100-5+1)+5))
	//console.log(body)
	if(!body.name || !body.number){
		return response.status(400).json({error:"no name or number"})
	}
	const found=persondata.find(n=>n.name===body.name)
	if(found){
		return response.status(400).json({error:"already exists"})
	}
	persondata=persondata.concat(body)
	response.json(body)
})

app.put('/api/persons/:id',(request,response)=>{
	console.log("im in put backend===")
	console.log("put backend",request.body,request.body.number)
	persondata=persondata.map(n=>n.id===request.params.id?{name:request.body.name,number:request.body.number,id:request.params.id}:n)
	return response.json(request.body)
})

app.get('/info',(request,response)=>{
	console.log(response)
	const temp = persondata.length
	const tempDate = Date.now()
	const now = new Date()
	const fullDate = now.getFullYear()
	response.send(`Phonebook has info for ${temp} people <br> ${now.toJSON()}`)
})


const PORT=3001
app.listen(PORT,()=>{
	console.log(`running on PORT ${PORT}`)
})
