import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterString, setNewFilterString ] = useState('');

  useEffect( () => {
      axios
          .get("/db.json")
          .then( response => {
              setPersons(response.data.persons)
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
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
        }
    }

  return (
      <div>
        <h2>Phonebook</h2>
          <Filter filterString={filterString} setNewFilterString={setNewFilterString} />

        <h3>Add new entry</h3>
          <PersonForm newName={newName}
                      handleChangeName={handleChangeName}
                      newNumber={newNumber}
                      handleChangeNumber={handleChangeNumber}
                      addNewPerson={addNewPerson} />
        <h2>Numbers</h2>
          <Persons persons={persons} filterString={filterString} />
      </div>
  )

}

export default App