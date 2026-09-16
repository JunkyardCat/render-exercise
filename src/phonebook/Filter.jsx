const Filter = ({filter,setNewFilter,persons}) =>{
	return(
	<>
	<div>
	  filter shown with <input value={filter} onChange={(e)=>setNewFilter(e.target.value)}/>
	  </div>
	  <div>
	  search result
	  {
		  persons.filter(n=>{
		return n.name.toLowerCase().includes(filter)
	}).map(n=><li key={n.id}>{n.name} {n.number}</li>)
	  }
	  </div>
	</>

	)

}

export default Filter
