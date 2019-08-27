import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterString, setNewFilterString ] = useState('');
  const [ notification, setNotification ] = useState(null);

  useEffect( () => {
    personService.getAll()
    .then( response => {
              setPersons(response.data)
          })
  }, [])

    const handleChangeName = (event) => {
        setNewName(event.target.value)
    };
    const handleChangeNumber = (event) => {
        setNewNumber(event.target.value)
    }
    const addNewPerson = (event) => {
        event.preventDefault()
        if (persons.map( p => p.name).includes(newName)) {
            alert(`${newName} is already in the books`)
        } else {
            const newPerson = {name: newName, number: newNumber}
            personService.create(newPerson)
                .then((response) => {
                    setPersons(persons.concat(response.data))
                    setNotification(`Added ${newName}`)
                    setNewName('')
                    setNewNumber('')
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                })

        }
    }
    const deletePerson = (id) => {
        if (window.confirm(`Delete person ${id} ?`)) {
            personService.remove(id)
                .then( (response) => setPersons(persons.filter( (person) => person.id !== id)))
        }
    }

  return (
      <div>
        <h2>Phonebook</h2>
          <Filter filterString={filterString} setNewFilterString={setNewFilterString} />

        <Notification message={notification} />

        <h3>Add new entry</h3>
          <PersonForm newName={newName}
                      handleChangeName={handleChangeName}
                      newNumber={newNumber}
                      handleChangeNumber={handleChangeNumber}
                      addNewPerson={addNewPerson} />
        <h2>Numbers</h2>
          <Persons persons={persons} filterString={filterString} deletePerson={deletePerson}/>
      </div>
  )

}

export default App