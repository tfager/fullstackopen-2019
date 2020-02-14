import React from "react";
import {createVote} from "../reducers/anecdoteReducer";

const AnecdoteList = ({store}) => {

    var anecdotes = store.getState();
    const vote = (id) => {
        store.dispatch(createVote(id))
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
