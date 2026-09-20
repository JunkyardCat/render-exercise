import { useState,useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import axios from 'axios'
import {getAll,update,add} from './PersonServices'
import Notification from './Notification'


const App = () => {
	/*
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  */

  	const [persons, setPersons] = useState([])
  	const [newName, setNewName] = useState('')
  	const [newNumber, setNewNumber] = useState('')
	const [filter,setNewFilter] = useState('')
	const [message,setMessage] = useState('')

	const generateId = () =>{
		return Math.random()
	}
  const handleAddPerson = (e) =>{
	  e.preventDefault()
	  //console.log(e.target.value)
	  //console.log(newName)
	  const exists =persons.filter(n=>n.name===newName)
	  
	  if(exists.length>0){
	  const newPerson = persons.map(n=>n.id===exists[0].id?{id:exists[0].id,name:newName,number:newNumber}:n)
	  console.log(newPerson)
		  const input = confirm(`${newName} is already added to Phonebook replace old number with new one?`)
		  if(input){
			  console.log("confirm",exists,exists[0].id)
			  update(exists[0].id,{name:newName,number:newNumber}).then(response=>{
				  console.log("handlePerson promise")
			  setPersons(newPerson)
				  setMessage(`updated ${newName}`)

			  }).catch(error=>{
          setMessage(error.response?.data?.error || "something went wrong")
        }
        )

		  }
	  }else{
		  const tempId = Math.max(...persons.map(n=>n.id))
		  console.log("tempId",tempId,persons.map(n=>Number(n.id)))
		  
		  //id:tempId+1,
		  let tempPerson = {
		  name:newName,
		  number:newNumber}
		  let newId="fff"

	
		  /*
		  axios.post('http://localhost:3001/persons',tempPerson).then(response=>
			  {
				  newId=response.data.id
				  tempPerson={
			  	id:newId,
			  	name:newName,
			  	number:newNumber
				  }
				  */
		  add(tempPerson).then(response=>{
			  console.log(response,response.data)

	  //const temp = [...persons,tempPerson]
	  const temp = [...persons,response]
		  console.log("temp",temp)
	  setPersons(temp)
	  setNewName("")
		  setNewNumber("")
				  setMessage(`Added ${newName}`)
		  	

			  }).catch(error=>{
          console.log("inside the add catch on frontend",error)
          setMessage(error.response?.data?.error || "something went wrong")
        })


	  }
	}

	useEffect(()=>{
		//const promise = axios.get('http://localhost:3001/persons').then(json=>setPersons(json.data))
		getAll().then(initial =>setPersons(initial))
		//setPersons(getAll())
		console.log(persons)
		//console.log()
		//setPersons(promis
		//console.log(promise)
	}

		
		,[])

  return (
    <div>
      <h2>Phonebook</h2>
	  <Filter filter={filter} setNewFilter={setNewFilter} persons={persons}/>
	  <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleAddPerson={handleAddPerson}/>
	<h2>Numbers</h2>
	  <Persons persons={persons} setPersons={setPersons} setMessage={setMessage}/>
	  <Notification message={message}/>
    </div>
  )
}

export default App
