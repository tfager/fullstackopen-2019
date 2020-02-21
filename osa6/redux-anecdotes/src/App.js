import React, { useEffect } from 'react';
import { connect} from "react-redux";
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import { initAnecdotes} from './reducers/anecdoteReducer';
import anecdoteService from './services/anecdoteService';

const App = ({initAnecdotes}) => {

    useEffect(() => {
        anecdoteService
            .getAll().then(notes => initAnecdotes(notes))
    },[])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { initAnecdotes })(App)