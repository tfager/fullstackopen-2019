import React from "react";
import {createAnecdote} from "../reducers/anecdoteReducer";
import {showNotificationTimed, setNotification, hideNotification} from "../reducers/notificationReducer";
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdoteService';



const AnecdoteForm = ({createAnecdote, setNotification, hideNotification}) => {
    const onSubmitCreateAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log("Creating anecdote with", content);
        const newAnecdote = await anecdoteService.createNew(content);
        console.log("New anecdote: ", newAnecdote);
        createAnecdote(newAnecdote);
        showNotificationTimed(setNotification, hideNotification, "You created: "+ content, 5000);
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
    setNotification,
    hideNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm);
