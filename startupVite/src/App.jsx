import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
    <>
      <header>
          <h1>Nielson's Economy</h1>
          <div className="white_space"></div>
          <div>
              <img id="stonkImage" width = "150px" src="https://i.pinimg.com/736x/08/1d/42/081d42bee6b2145dd4afddcbf14553af.jpg" />
          </div>
      </header>
      <main>
      </main>
      <footer id="infoFooter">
        <span className="text-reset">Kael Nielson</span>
        <a href="https://github.com/KaelNielson/startup">Git Repository</a>
      </footer>
    </>
  )
}

export default App
