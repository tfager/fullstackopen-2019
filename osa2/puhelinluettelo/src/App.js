import React, { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filterString, setNewFilterString ] = useState('');

  const personRows = () => persons.
    filter(person => person.name.toLowerCase().indexOf(filterString.toLowerCase()) != -1).
    map(person =>
            <Person
                key={person.name}
                person={person}
            />
    )
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
          { personRows() }
      </div>
  )

}

export default App