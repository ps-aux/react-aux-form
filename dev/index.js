import ReactDOM from 'react-dom'
import React from 'react'
import app from '../package.json'
import DevApp from './DevApp'

const rootEl = window.document.getElementById('root')

ReactDOM.render(
    <div>
        <h1>Dev UI for {app.name} {app.version}</h1>
        <DevApp/>
    </div>, rootEl)


