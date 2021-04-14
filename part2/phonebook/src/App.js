import React, { useState, useEffect } from 'react'
import axios from 'axios'


const DisplayPersons = ({searchName, persons}) => (searchName === '') ?
    <ul>
      {persons.map(person => <li key={person.id}>{person.name}, {person.number}</li>)}
    </ul>
    : 
    <ul>
      {persons.filter(person => person.name.toUpperCase().includes(searchName.toUpperCase()))
                .map(person => <li key={person.id}>{person.name}, {person.number}</li>)}
    </ul>


const Filter = ({searchName, handleSearchChange}) => {
  return (
  <p>filter shown with 
    <input value={searchName} onChange={handleSearchChange}/>
  </p>
  )
}

const Form = ({handleSubmit, newName, newNumber,handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div> debug: {newName}, {newNumber}</div>
      <div> name: <input value={newName} onChange={handleNameChange}/></div>
      <div> number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const App = () => {
  const [ persons, setPersons ] = useState([''])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')


  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!persons.map(person => person.name).includes(newName)) {
      const nameObject = {
        name: newName,
        number: newNumber
      }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
    } else {
    alert(`${newName} is already added to phonebook`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange}/>
      <h2>add new entries</h2>
      <Form handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      {/* <form onSubmit={handleSubmit}>
        <div>debug: {newName}, {newNumber}</div>
        <div> name: <input value={newName} onChange={handleNameChange}/> </div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> */}
      <h2>Numbers</h2>
      <DisplayPersons searchName={searchName} persons={persons}/>
    </div>
  )
}

export default App