import deepFreeze from 'deep-freeze'
import reducer from './anecdoteReducer'
import { createVote } from './anecdoteReducer'

describe('anecdote reducer', () => {

    test('should return a proper initial state when called with undefined state', () => {
        const action = {
            type: 'DO_NOTHING'
        }
        const newState = reducer(undefined, action)
        expect(newState.length).toEqual(6)
    })

    test('votes should increase', () => {
        const anecdotes = reducer(undefined, { type: 'DO_NOTHING'})
        const idToVote = anecdotes[0].id;
        deepFreeze(anecdotes)
        const newState = reducer(anecdotes, createVote(idToVote))
        expect(newState.length).toEqual(6)
        const votedAnecdote = newState.find(a => a.id === idToVote)
        expect(votedAnecdote.votes).toEqual(1)
    })
})

