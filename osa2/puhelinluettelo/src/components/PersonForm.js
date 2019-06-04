import React from 'react'

const PersonForm = ( { newName, newNumber, handleChangeName, handleChangeNumber, addNewPerson }) => {
    return (
        <form>
            <div>
                name: <input value={ newName } onChange={ handleChangeName }/>
            </div>
            <div>
                number: <input value={ newNumber} onChange={ handleChangeNumber }/>
            </div>
            <div>
                <button type="submit" onClick={ addNewPerson } >add</button>
            </div>
        </form>
    )
}

export default PersonForm


