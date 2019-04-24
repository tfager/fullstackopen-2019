import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => {
  return (
    <div>
      <button onClick={ handleClick }>{ text }</button>
    </div>
  )
}

const Statistic = ( { text, value } ) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ good, bad, neutral}) => {
  if (good === 0 && bad === 0 && neutral === 0) {
    return (<div>Ei yhtään palautetta annettu</div>)
  } else {
    return (
        <table>
          <tbody>
            <Statistic text="hyvä" value={ good } />
            <Statistic text="neutraali" value={ neutral } />
            <Statistic text="huono" value={ bad } />
            <Statistic text="keskiarvo" value={ (good-bad)/(good+bad+neutral) } />
            <Statistic text="positiivisia" value={ (100*good/(good+bad+neutral)).toFixed(0) + "%" } />
            </tbody>
        </table>
    )
  }
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <Button text="hyvä" handleClick={ () => setGood(good+1) }/>
        <Button text="neutraali" handleClick={ () => setNeutral(neutral+1) }/>
        <Button text="huono" handleClick={ () => setBad(bad+1) }/>
      </div>
      <h2>Statistiikkaa</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)