import anecdoteService from '../services/anecdoteService';

const initialState = []

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'CREATE_ANECDOTE',
      anecdote: newAnecdote
    })
  }
}

export const createVote = (id) => {
  return async (dispatch, getState) => {
    console.log("State = ", getState());
    let votes = getState().anecdotes.filter(anecdote => anecdote.id === id)[0].votes
    anecdoteService.updateVotes(id, votes+1)
    dispatch({
        type: 'VOTE',
        id: id
    })
  }
}

export const initAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
        type: 'INIT_ANECDOTES',
        anecdotes: anecdotes
    })
  }
}

const reducer = (state = initialState, action) => {
  if (action === undefined) {
    return initialState;
  }

  console.log('state now: ', state)
  console.log('action', action)
  let newState = state;

  switch (action.type) {
    case 'VOTE':
      newState = state.map(anecdote =>
          anecdote.id === action.id ? {...anecdote, votes: anecdote.votes + 1} : anecdote)
      break;
    case 'CREATE_ANECDOTE':
      newState = [...state, action.anecdote ]
      break;

    case 'INIT_ANECDOTES':
      newState = action.anecdotes;
      break;

    default:
      console.log("Whaaaat? action.type = "+ action.type);
      break;
  }

  return newState.sort((a, b) => (b.votes - a.votes));
}

export default reducer