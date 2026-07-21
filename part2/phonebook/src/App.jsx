import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: '' })

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
  event.preventDefault()

  const existingPerson = persons.find(
    person => person.name.toLowerCase() === newName.toLowerCase()
  )

  if (existingPerson && existingPerson.number === newNumber) {
    alert(`${newName} is already added to phonebook`)
    return
  }

  if (existingPerson && existingPerson.number !== newNumber) {
    const confirmed = window.confirm(
      `${newName} is already added to the phonebook. Replace the old number with the new one?`
    )

    if (!confirmed) {
      return
    }

    const changedPerson = {
      ...existingPerson,
      number: newNumber,
    }

    personService
      .update(existingPerson.id, changedPerson)
      .then(returnedPerson => {
        setPersons(currentPersons =>
          currentPersons.map(person =>
            person.id === existingPerson.id
              ? returnedPerson
              : person
          )
        )
        setNotification({ message: `Updated ${returnedPerson.name}'s number`, type: 'success' })
        setTimeout(() => {
          setNotification({ message: null, type: '' })
        }, 5000)

        setNewName('')
        setNewNumber('')
      }).catch(error => {
        setNotification({ message: `Information of ${existingPerson.name} has already been removed from server`, type: 'error' })
        setTimeout(() => {
          setNotification({ message: null, type: '' })
        }, 5000)
      })

    return
  }

  const nameObject = {
    name: newName,
    number: newNumber,
  }

  personService
    .create(nameObject)
    .then(returnedPerson => {
      setPersons(currentPersons =>
        currentPersons.concat(returnedPerson)
      )

      setNotification({ message: `Added ${returnedPerson.name}`, type: 'success' })
      setTimeout(() => {
        setNotification({ message: null, type: '' })
      }, 5000)

      setNewName('')
      setNewNumber('')
    })
}
    const deleteName = (id) => {
      const person = persons.find(p => p.id === id)
      if (!window.confirm(`Delete ${person.name}?`)) {
        return
      }
      personService
      .destroy(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
      setNotification({ message: `Information of ${person.name} has already been removed from server`, type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: '' })
      }, 5000)
      setPersons(persons.filter(p => p.id !== id))
    })
}

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />

      <Filter filter={filter} setFilter={setFilter} />

      <h3>Add a new</h3>

      <PersonForm
        addName={addName}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons} deletePerson={deleteName} />
    </div>
  )
}


export default App