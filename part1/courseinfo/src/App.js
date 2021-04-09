import React from 'react'

const Header = (props) => {
  return(
    <>
      <h1>The name of this course is: {props.name}</h1>
    </>
  )
}

const Content = (props) => {
  return(
    <>
      <Part partCount={0} name={props.partName0} exercises={props.exercise0}/>
      <Part partCount={1} name={props.partName1} exercises={props.exercise1}/>
      <Part partCount={2} name={props.partName2} exercises={props.exercise2}/>
    </>
  )
}

const Part = (props) => (
  <>
    <p>Title of Part {props.partCount} is "{props.name}" which contains {props.exercises} exercises</p>
  </>
)

const Total = (props) => {
  return(
    <>
      <p>The total number of exercises is {props.totalExercise}</p>
    </>
  )
}

const App = () => {
  // const course = 'Half Stack application development'
  const courseName = 'Full Stack Open 2021'
  
  const partName0 = "Intro to Web Dev"
  const partName1 = "Intro to React"
  const partName2 = "Communicating with server"
  const exercise0 = 6
  const exercise1 = 14
  const exercise2 = 20
  
  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14

  return (
    <div>
      <Header name={courseName} />
      <Content exercise0={exercise0} exercise1={exercise1} exercise2={exercise2} 
        partName0={partName0} partName1={partName1} partName2={partName2}/>
      <Total totalExercise={exercise0+exercise1+exercise2} />
    </div>
  )
}

export default App