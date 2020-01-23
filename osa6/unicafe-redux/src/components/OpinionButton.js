import React from 'react'
import PropTypes from 'prop-types'

const OpinionButton = ({text, opinionType, store}) => {
    const incrementAction = () => {
        store.dispatch({
            type: opinionType
        })
    }

    return (
            <button onClick={incrementAction}>{text}</button>
    )
}

OpinionButton.propTypes = {
    text: PropTypes.string.isRequired,
    opinionType: PropTypes.string.isRequired,
    store: PropTypes.func.isRequired
}

export default OpinionButton;