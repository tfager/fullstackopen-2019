import React from 'react';
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import reducer from './reducer'
import OpinionButton from './components/OpinionButton'
import StatDisplay from './components/StatDisplay'
import ActionButton from "./components/ActionButton";

const store = createStore(reducer)
const GOOD = 'GOOD'
const BAD = 'BAD'
const OK = 'OK'
const ZERO = 'ZERO'

const App = () => {
    const resetCountersAction = {
        type: ZERO
    }

    return (
        <div>
            <OpinionButton text="hyvä" opinionType={GOOD} store={store}/>
            <OpinionButton text="neutraali" opinionType={OK} store={store}/>
            <OpinionButton text="huono" opinionType={BAD} store={store}/>
            <ActionButton store={store} text="nollaa tilastot" action={resetCountersAction}/>
            <StatDisplay text="hyvä" store={store} opinionVar="good"/>
            <StatDisplay text="neutraali" store={store} opinionVar="ok"/>
            <StatDisplay text="huono" store={store} opinionVar="bad"/>
        </div>
    )
}

const renderApp = () => {
    ReactDOM.render(<App/>, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
