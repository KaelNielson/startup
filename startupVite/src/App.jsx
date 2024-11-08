import React from 'react';
// import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './game/game';
import { Scores } from './score/score';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
          <h1>Nielson's Economy</h1>
          <div class="white_space"></div>
          <div>
              <img id="stonkImage" width = "150px" src="https://i.pinimg.com/736x/08/1d/42/081d42bee6b2145dd4afddcbf14553af.jpg" />
          </div>
      </header>
      <main></main>
      <footer id="infoFooter">
          <span class="text-reset">Kael Nielson</span>
          <a href="https://github.com/KaelNielson/startup">Git Repository</a>
      </footer>
    </>
  )
}

export default App
