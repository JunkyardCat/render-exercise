import {del} from './PersonServices'
const Persons = ({persons, setPersons, setMessage}) =>{
	const handleDelete=(e)=>{
		console.log("delete id",e.target.id)
		const id=e.target.id
			const tempPerson=persons.find(n=>n.id===id)
		del(id).then(n=>{console.log("success")

		const temp = persons.filter(n=>n.id!==String(id))
			setPersons(temp)
		console.log("remaining persons",temp)
      console.log("inside front end delete ",n)
			setMessage(`deleted ${n.name}`)

		}).catch(error=>{
			setMessage(`${tempPerson.name} already deleted in server`)
		})
	}

	return(
		<>

	  {persons.map(n=><li key={n.id}>{n.name} {n.number} <button id={n.id} onClick={handleDelete}>delete</button></li>)}
		</>
	)
}

export default Persons
