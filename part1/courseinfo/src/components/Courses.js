import React from 'react'

const Header = (props) => {
   return(
     <>
       <h1>This is: {props.name}</h1>
     </>
   )
 }
 
 const Content = ({parts}) => (
   parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)
 )
 
 const Part = (props) => (
   <>
     <p>"{props.name}" contains {props.exercises} exercises</p>
   </>
 )
 
 const Total = ({parts}) => <h4>The total number of exercises is {parts.reduce((sum, part) => sum + part.exercises, 0)}</h4>
 
 // const Total = ({parts}) => {
 //   let totalExercise = parts.reduce((sum, part) => {
 //     return sum + part.exercises
 // }, 0)
 //   return <p>The total number of exercises is {totalExercise}</p>
 // }
 
 const Courses = ({courses}) => {
   return courses.map(course => {
     return (
     <div key={course.id}>
       <Header name={course.name}/>
       <Content parts={course.parts}/>
       <Total parts={course.parts}/>
     </div>
     )
   })
 }

 export default Courses
