import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({text, value}) => (
  <p>{text} {value}</p>
)

const DisplayStat = ({good,neutral,bad}) => (
  <>
  <h1>statistics</h1>
      <Statistics text='good' value={good}/>
      <Statistics text='neutral' value={neutral}/>
      <Statistics text='bad' value={bad}/>
      <Statistics text='all' value={bad+neutral+good}/>
      <Statistics text='average' value={(good-bad)/(good+neutral+bad)}/>
      <Statistics text='positive' value={good/(good+neutral+bad)}/>
  </>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const upvoteGood = () => setGood(good + 1)
  const upvoteNeutral = () => setNeutral(neutral + 1)
  const upvoteBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feeedback</h1>
      <Button handleClick={upvoteGood} text='good'/>
      <Button handleClick={upvoteNeutral} text='neurtral'/>
      <Button handleClick={upvoteBad} text='bad'/>

      <DisplayStat good={good} neutral={neutral} bad={bad}/>

      {/* <h1>statistics</h1>
      <Statistics text='good' value={good}/>
      <Statistics text='neutral' value={neutral}/>
      <Statistics text='bad' value={bad}/>
      <Statistics text='all' value={bad+neutral+good}/>
      <Statistics text='average' value={(good-bad)/(good+neutral+bad)}/>
      <Statistics text='positive' value={good/(good+neutral+bad)}/> */}
    </div>
  )
}

export default App