import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props["course"]}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}
const Content = (props) => {
  let parts = props.parts
  return (
    <div>
      <Part name={ parts[0]["name"]} exercises={ parts[0]["exercises"]} />
      <Part name={ parts[1]["name"]} exercises={ parts[1]["exercises"]} />
      <Part name={ parts[2]["name"]} exercises={ parts[2]["exercises"]} />
    </div>
  )
}

const Total = (props) => {
  let total = 0;
  props.parts.forEach( part => total += part.exercises );

  return (
    <p>yhteensä {total} tehtävää</p>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name } />
      <Content parts={ course.parts } />
      <Total parts={ course.parts } />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))