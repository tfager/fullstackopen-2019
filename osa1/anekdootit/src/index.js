import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const addPoint = (anecdoteIndex, points) => {
  let newPoints = [ ...points]
  newPoints[anecdoteIndex] += 1
  console.log("New points = "+ newPoints)
  return newPoints
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  let mostVotesIndex = 0;
  let mostVotes = 0;
  for (let i=0; i<points.length; i++) {
    if (points[i] > mostVotes) {
      mostVotes = points[i]
      mostVotesIndex = i;
    }
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>Has { points[selected] } votes.</div>
      <button onClick={ () => setPoints(addPoint(selected, points)) } >Vote</button>
      <button onClick={ () =>  setSelected(Math.floor(Math.random() * 6)) } >Next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <div>{props.anecdotes[mostVotesIndex]}</div>
      <div>Has { mostVotes } votes.</div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)