import React from 'react';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Game } from './game/game';
import { Score } from './score/score';
import {About } from './about/about';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [user, setUserState] = React.useState(JSON.parse(localStorage.getItem('user')))

  const setUser = (newUser) => {
      setUserState(newUser)
      localStorage.setItem('user', JSON.stringify(newUser))
  }

  if (user != null) {
    // console.log("are we working here?")
    return (
      <BrowserRouter>
        <div className = 'body'>
        <header>
        <h1 className = 'name'>Nielson's Economy</h1>
              <nav>
                  <menu id="navigationMenu" className="links">
                      <ul><NavLink className='nav-link' to=''>Login</NavLink></ul>
                      <ul><NavLink className='nav-link' to='score'>Scoreboard</NavLink></ul>
                      <ul><NavLink className='nav-link' to='game'>Play</NavLink></ul>
                      <ul><NavLink className='nav-link' to='about'>About</NavLink></ul>
                  </menu>
              </nav>
              <div className="white_space"></div>
              <img id="stonkImage" width="150px" src="https://i.pinimg.com/736x/08/1d/42/081d42bee6b2145dd4afddcbf14553af.jpg" />
        </header>
        <Routes>
          <Route path='/' element={<Login u={user} uS={setUser}/>} exact />
          <Route path='/game' element={<Game u={user} uS={setUser}/>} />
          <Route path='/score' element={<Score />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <footer>
          <span className="text-reset">Kael Nielson</span>
          <a href="https://github.com/KaelNielson/startup">Git Repository</a>
        </footer>
        </div>
      </BrowserRouter>
    )
  } else {
    // console.log("or are we here?")
    return (
      <BrowserRouter>
        <div className = 'body'>
        <header>
        <h1 className = 'name'>Nielson's Economy</h1>
              <nav>
                  <menu id="navigationMenu" className="links">
                      {/* <ul><a href="index.html">Login</a></ul> */}
                      {/* <ul><a href="score.html">Scoreboard</a></ul> */}
                      {/* <ul><a href="game.html">Play</a></ul> */}
                      <ul><NavLink className='nav-link' to=''>Login</NavLink></ul>
                      <ul><NavLink className='nav-link' to='about'>About</NavLink></ul>
                  </menu>
              </nav>
              <div className="white_space"></div>
              <img id="stonkImage" width="150px" src="https://i.pinimg.com/736x/08/1d/42/081d42bee6b2145dd4afddcbf14553af.jpg" />
        </header>
        <Routes>
          <Route path='/' element={<Login u={user} uS={setUser}/>} exact />
          <Route path='/game' element={<Game u={user} uS={setUser}/>} />
          <Route path='/score' element={<Score />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <footer>
          <span className="text-reset">Kael Nielson</span>
          <a href="https://github.com/KaelNielson/startup">Git Repository</a>
        </footer>
        </div>
      </BrowserRouter>
    )
  }
}

export default App

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}