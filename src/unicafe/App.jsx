import { useState } from 'react'

const Button = ({click,name}) =>{
	return(
		<button onClick={click}>{name}</button>
	)
}

const StatisticLine = ({text,value}) =>{
	return(
		<>
		<tr><td>{text}</td><td>{value}</td></tr>
		</>
	)
}

const Statistics = ({good,neutral,bad}) =>{

	return(
		<div>
		<table>
		<tbody>
			<StatisticLine text="good" value={good}/>
			<StatisticLine text="neutral" value={neutral}/>
			<StatisticLine text="bad" value={bad}/>
		{(good+neutral+bad)?(
			<>
			<StatisticLine text="all" value={good+neutral+bad}/>
			<StatisticLine text="average" value={(good-bad)/(good+neutral+bad)}/>
			<StatisticLine text="positive" value={(good)/(good+neutral+bad)}/>
			</>
		):(
			<></>
		)
		}
		</tbody>
		</table>
		</div>
	)

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () =>{
	  setGood(good+1)
  }
  const handleNeutral = () =>{
	  setNeutral(neutral+1)
  }
  const handleBad = () =>{
	  setBad(bad+1)
  }  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
	const [selected,setSelected]=useState(0)
	
	const [voting, setVoting] = useState(new Array(anecdotes.length).fill(0))
   
	const handleVote = () =>{
		//vote[selected]+=1
		const temp = [...voting]
		temp[selected]+=1
		setVoting(temp)
		console.log("function",voting)
	}
console.log(voting)


  return (
    <div>
	  <h1>give feedback</h1>
	  <Button click={handleGood} name="good"/>
	  <Button click={handleNeutral} name="neutral"/>
	  <Button click={handleBad} name="bad"/>
	  <h1>statistics</h1>
	  <Statistics good={good} neutral={neutral} bad={bad}/>
	  <h1>Anecdote of the Day</h1>
	  <p>{anecdotes[selected]} has {voting[selected]} votes</p>
	  <button onClick={handleVote}>vote</button>
	  <button onClick={()=>setSelected(Math.floor(Math.random()*(7-0+1))+0)}>random anecdote</button>
	  <h1>Anecdotes with most votes</h1>
	  <p>{anecdotes[voting.indexOf(Math.max(...voting))]}</p>
	  <p>has {voting[voting.indexOf(Math.max(...voting))]} votes</p>
	  
	  
    </div>
  )
}

export default App
