import React from 'react'
import PropTypes from 'prop-types'

const removeKey = (k, { [k]:_, ...o }) => o

const LoginForm = ( { username, password, errorMessage, handleLogin}) => {
    // TODO: controlled/noncontrolled? See console
    const username_field = removeKey('reset', username)
    const password_field = removeKey('reset', password)
    return (
        <div id="loginForm">
            <h2>Log in</h2>
            { errorMessage }
            <form onSubmit={handleLogin}>
                <div>
                    Username
                    <input { ...username_field } />
                </div>
                <div>
                    Password
                    <input {...password_field} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired,
    errorMessage: PropTypes.string.isRequired
}
export default LoginForm