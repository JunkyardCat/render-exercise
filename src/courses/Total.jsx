const Total = ({course}) =>{
	//console.log(parts[0].exercises)
	const total = course.parts.reduce((a,b)=>a+b.exercises,0)
	return (
            <p>Number of exercises {total} </p>
	)
}

export default Total
