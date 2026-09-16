import Part from './Part'
const Content = ({course}) =>{
	
	//console.log("this is part1",part1)

	return (
		<div>
		{
			course.parts.map(n=>(
				<Part key={n.id} part={n.name} exercises={n.exercises}/>
			))
		}
		</div>
	)
}

export default Content
