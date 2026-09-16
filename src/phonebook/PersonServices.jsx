import axios from 'axios'

//const baseUrl = 'http://localhost:3001/api/persons'

//changed backend to relative url
const baseUrl = '/api/persons'

const getAll = () =>{

	return axios.get(baseUrl).then(response=>response.data)
}

const del = (id) =>{
	console.log("axios delete",id)
	return axios.delete(baseUrl+'/'+id).then(response=>{
		console.log("here i am")
		return response.data}
	)
}

const update = (id,data) =>{
	console.log("update service",id,data)

	return axios.put(baseUrl+'/'+id,data).then(response=>{
		console.log("update success")
		console.log("response",response.data)
		return response})
}

const add = (data) =>{
	console.log("add",data)
	return axios.post(baseUrl,data).then(response=>response.data)
}


export {getAll,del,update,add}
