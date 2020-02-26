import React from "react";
import {createVote} from "../reducers/anecdoteReducer";
import {showNotification} from "../reducers/notificationReducer";
import {connect} from "react-redux";

const AnecdoteList = ({anecdotes, showNotification, createVote}) => {

    const vote = (id) => {
        let anecdote = anecdotes.filter( a => a.id === id)[0];
        createVote(id)
        showNotification("You voted: "+ anecdote.content, 5000);
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes
    }
};

const mapDispatchToProps = {
    createVote,
    showNotification
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList);
