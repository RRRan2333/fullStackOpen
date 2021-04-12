import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!persons.map(person => person.name).includes(newName)) {
      const nameObject = {
        name: newName,
        // date: new Date().toISOString(),
        // important: Math.random() > 0.5,
        // id: notes.length + 1,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  } else {
    alert(`${newName} is already added to phonebook`)
  }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>debug: {newName}</div>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{persons.map(person => <li key={person.name}>{person.name}</li>)}</ul>
    </div>
  )
}

export default App