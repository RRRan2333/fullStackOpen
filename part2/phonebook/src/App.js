import React, { useState, useEffect } from 'react'
import personService from './services/persons'


const DisplayPersons = ({searchName, persons, deletePerson}) => (searchName === '') ?
    <ul>
      {persons.map(person => <li key={person.id}>{person.name}, {person.number} <DeleteButton deletePerson={deletePerson} id={person.id}/></li>)}
    </ul>
    : 
    <ul>
      {persons.filter(person => person.name.toUpperCase().includes(searchName.toUpperCase()))
        .map(person => <li key={person.id}>{person.name}, {person.number} <DeleteButton deletePerson={deletePerson} id={person.id}/></li>)}
    </ul>

const DeleteButton = ({deletePerson, id}) => {
  return (
    <button onClick={() => deletePerson(id)}>
      delete
    </button>
  )
}

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
      {/* <div> debug: {newName}, {newNumber}</div> */}
      <div> name: <input value={newName} onChange={handleNameChange}/></div>
      <div> number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="msg">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([''])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ message, setMessage ] = useState(null)


  useEffect(() => {
    // console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        console.log('initial promise fulfilled')
      })
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     console.log('promise fulfilled')
    //     setPersons(response.data)
    //   })
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

  const deletePerson = (id) => {
    console.log(`deletePerson function triggered in App component`)
    console.log(id)
    const matchedPersonName = persons.find(person => person.id === id).name

    if(window.confirm(`Delete ${matchedPersonName}?`)) {    
      personService
        .remove(id)
        .then(returned =>{
          console.log(returned)
          setPersons(persons.filter(note => note.id !== id))
          setMessage(`${matchedPersonName} successfully deleted`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    
    const matchedPerson = persons.find(p => p.name === newName)
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (!matchedPerson){
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`${returnedPerson.name} successfully added`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    } else if (window.confirm(`${newName} is already added. Replace old number with new one?`)) {
      // const person = persons.find(p => p.name === newName)
      // const changedPerson = {...person, number: newNumber}
      personService
        .update(matchedPerson.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`${returnedPerson.name} number changed to ${newNumber}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          setMessage(`Information of ${matchedPerson.name} has already been removed from server`)
        })
    }
    // if (!persons.map(person => person.name).includes(newName)) {
    //   const nameObject = {
    //     name: newName,
    //     number: newNumber
    //   }
    // setPersons(persons.concat(nameObject))
    // setNewName('')
    // setNewNumber('')
    // } else {
    // alert(`${newName} is already added to phonebook`)
    // }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter searchName={searchName} handleSearchChange={handleSearchChange}/>
      <h2>add new entries</h2>
      <Form handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <DisplayPersons searchName={searchName} persons={persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App