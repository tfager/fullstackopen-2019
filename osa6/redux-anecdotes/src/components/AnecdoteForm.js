import React from "react";
import {createAnecdote} from "../reducers/anecdoteReducer";
import {showNotificationTimed} from "../reducers/notificationReducer";


const AnecdoteForm = ({store}) => {
    const onSubmitCreateAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        store.dispatch(
            createAnecdote(content))
        showNotificationTimed(store, "You created: "+ content, 5000);
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

export default AnecdoteForm;
