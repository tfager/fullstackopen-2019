import React from 'react'
import PropTypes from 'prop-types'

const ActionButton = ({text, action, store}) => {
    const buttonClicked = () => {
        store.dispatch(action)
    }

    return (
        <button onClick={buttonClicked}>{text}</button>
    )
}

ActionButton.propTypes = {
    text: PropTypes.string.isRequired,
    action: PropTypes.object.isRequired,
    store: PropTypes.func.isRequired
}

export default ActionButton;