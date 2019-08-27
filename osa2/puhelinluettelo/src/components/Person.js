import React from 'react'

const Person = ( {person, deletePerson }) => {
    const deleteClicked = () => { deletePerson(person.id); }
    return (
        <div>
            { person.name } { person.number }

            <button onClick={deleteClicked}> Delete</button>
        </div>
    )

}

export default Person