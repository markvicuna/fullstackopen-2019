import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PersonForm = ({ onNameChange, nameValue, onNumberChange, numberValue, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
          <input value={nameValue} onChange={onNameChange} />
      </div>
      <div>
        number:
          <input value={numberValue} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({ onFilterChange, filterValue }) => {
  return (
    <div>
      filter shown with
        <input value={filterValue} onChange={onFilterChange} />
    </div>
  )
}

const Persons = ({ persons, filter }) => {
  const personsToShow = (filter === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const rows = () => personsToShow.map(person =>
    <div key={person.name}>{person.name} {person.number}</div>
  )

  return (
    <div>
      {rows()}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === personObject.name)) {
      alert(`${personObject.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        filterValue={filter}
        onFilterChange={handleFilterChange}
      />

      <h2>add a new</h2>

      <PersonForm
        onNameChange={handleNameChange}
        nameValue={newName}
        onNumberChange={handleNumberChange}
        numberValue={newNumber}
        onSubmit={addPerson}
      />

      <h2>Numbers</h2>

      <Persons
        persons={persons}
        filter={filter}
      />

    </div>
  )
}

export default App