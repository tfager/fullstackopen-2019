import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ( { username, password, setUsername, setPassword, errorMessage, handleSubmit}) => {
    return (
        <div id="loginForm">
            <h2>Log in</h2>
            { errorMessage }
            <form onSubmit={handleSubmit}>
                <div>
                    Username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    Password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired
}
export default LoginForm