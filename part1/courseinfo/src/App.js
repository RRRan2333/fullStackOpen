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
      <Part partCount={1} name={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part partCount={2} name={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part partCount={3} name={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </>
  )
}

const Part = (props) => (
  <>
    <p>Title of Part {props.partCount} is "{props.name}" which contains {props.exercises} exercises</p>
  </>
)

const Total = (props) => {
  let totalExercise = 0
  props.parts.forEach((part) => {
    totalExercise += part.exercises
    console.log(totalExercise)
  })
  return(
    <>
      <p>The total number of exercises is {totalExercise}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App