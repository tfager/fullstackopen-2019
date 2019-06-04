import React from 'react'

const Filter = ( props) => {
    const handleChangeFilter = (event) => {
        props.setNewFilterString(event.target.value)
    }
    return (
        <div>
            Filter list: <input value={ props.filterString } onChange={ handleChangeFilter } />
        </div>
    )

}

export default Filter