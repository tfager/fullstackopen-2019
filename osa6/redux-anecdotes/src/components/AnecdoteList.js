import React from "react";
import {createVote} from "../reducers/anecdoteReducer";
import {showNotificationTimed} from "../reducers/notificationReducer";

const AnecdoteList = ({store}) => {

    let anecdotes = store.getState().anecdotes;
    const vote = (id) => {
        let anecdote = store.getState().anecdotes.filter( a => a.id === id)[0];
        store.dispatch(createVote(id))
        showNotificationTimed(store, "You voted: "+ anecdote.content, 5000);
    }


    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList;
