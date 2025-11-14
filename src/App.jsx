import { useState } from 'react'
import TicTacToe from './components/TicTacToe'
import './styles/App.css'

function App() {
  return (
    <div className="app">
      <h1 className="app-title">Tic Tac Toe</h1>
      <div className="app-container">
        <TicTacToe />
      </div>
    </div>
  )
}

export default App

