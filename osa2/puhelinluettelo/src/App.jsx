import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Display from './components/Display'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [notificationType, setNotificationType] = useState('')

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
          .catch(error => {
            setNewMessage(`${newName} has already been removed from phonebook`)
            setNotificationType('error')
            setTimeout(() => {
              setNewMessage(null)
            }, 2000)
          })
        newPerson.id = person[0].id
        persons[persons.indexOf(person[0])]=newPerson
        setNewName('')
        setNewNumber('')
        setNewMessage(`The number of ${newPerson.name} was replaced`)
        setNotificationType('change')
        setTimeout(() => {
          setNewMessage(null)
        }, 2000)
      }
    return;
    }
    personsService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setNewMessage(`${newPerson.name} was added to the phonebook`)
        setNotificationType('add')
        setTimeout(() => {
          setNewMessage(null)
        }, 2000)
      })
  }

  const removePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
      personsService
      .remove(id)

    setPersons(persons.filter((person) =>  person.id != id ))
    setNewMessage(`${name} was removed from phonebook`)
    setNotificationType('remove')
    setTimeout(() => {
      setNewMessage(null)
    }, 2000)
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
      <Notification message={newMessage} notificationType={notificationType} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Display persons={persons} newFilter={newFilter} onDelete={removePerson}/>
    </div>
  )

}

export default App