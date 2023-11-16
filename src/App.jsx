import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <div className="info">
        <h1 className="title">Memory Game</h1>
        <div className="score-container">
          <h3>Score: 0</h3>
          <h3>Best: 0</h3>
        </div>
      </div>

      <p>Get points by clicking on an image but dont click on any more than once!</p>

      <div className="card-holder"></div>
    </div>
  )
}

export default App
