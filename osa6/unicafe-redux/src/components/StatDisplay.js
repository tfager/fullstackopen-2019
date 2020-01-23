import React from 'react'
import PropTypes from 'prop-types'

const StatDisplay = ({text, opinionVar, store}) => {
    return (
        <div>{text} {store.getState()[opinionVar]}</div>
    )
}

StatDisplay.propTypes = {
    text: PropTypes.string.isRequired,
    opinionVar: PropTypes.string.isRequired,
    store: PropTypes.func.isRequired
}

export default StatDisplay;