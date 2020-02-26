import React from "react";
import {createAnecdote} from "../reducers/anecdoteReducer";
import {showNotification} from "../reducers/notificationReducer";
import { connect } from 'react-redux'

const AnecdoteForm = ({createAnecdote, setNotification, hideNotification}) => {
    const onSubmitCreateAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        createAnecdote(content);
        showNotification("You created: "+ content, 5000);
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={onSubmitCreateAnecdote}>
                <div><input name="anecdote"/></div>
                <button>create</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = {
    createAnecdote,
    showNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm);
