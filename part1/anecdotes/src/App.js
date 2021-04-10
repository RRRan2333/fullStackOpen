import React, { useState } from 'react'

// const Button = ({anecdotes, setSelected}) => {
//   <button onClick={}>next anecdote</button>
// }



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(Math.floor(Math.random()*(anecdotes.length)))
  const [votes, setVote] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  
  const addOneVote = (votes,selected) => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVote(newVotes)
  }

  let indexMostPopular = votes.indexOf(Math.max(...votes))
  console.log(selected)
  console.log(votes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <h4>{anecdotes[selected]}</h4>
      <h4>has {votes[selected]} votes</h4>
      <button onClick={() => addOneVote(votes, selected)}>
        vote
      </button>
      <button onClick={()=>setSelected(Math.floor(Math.random()*(anecdotes.length)))}>
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <h4>{anecdotes[indexMostPopular]}</h4>
      <h4>has {votes[indexMostPopular]} votes</h4>
    </div>
  )
}

export default App