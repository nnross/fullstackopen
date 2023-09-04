import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Display from './components/Display'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
    personsService
      .getAll()
      .then(response => setPersons(response.data))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if
    (persons.some(e => e.name == newName)){
      if
      (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.filter(e => e.name == newName)
        personsService
          .update(person[0].id, newPerson)
        newPerson.id = person[0].id
        persons[persons.indexOf(person[0])]=newPerson
        setNewName('')
        setNewNumber('')
      }
    return;
    }
    personsService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
  }

  const removePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
      personsService
      .remove(id)

    setPersons(persons.filter((person) =>  person.id != id ))
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
}

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Display persons={persons} newFilter={newFilter} onDelete={removePerson}/>
    </div>
  )

}

export default App