import React from 'react'
import Person from '../components/Person'

const Persons = ( { persons, filterString }) => {

    const personRows = () => persons.filter(person => person.name.toLowerCase().indexOf(filterString.toLowerCase()) !== -1)
        .map(person =>
            <Person
                key={person.name}
                person={person}
            />
        )

    return (
        <div>
            { personRows() }
        </div>
    )
}

export default Persons
