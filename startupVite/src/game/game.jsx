import React from 'react';
import "./game.css"


export function Game() {
  const [exists, setExists] = React.useState(false);
  const [name, setName] = React.useState("")
  const [stats, setStats] = React.useState([0,0,0,0,0,0,0])

  function deleteBusiness() {
    document.getElementById("restartButton").style.display = "none"
    document.getElementById("questioningButton").style.display = "block"
  }

  function stepTwo() {
    return setExists(false)
  }

  function createName() {
    let r = Math.random()
    let newName = ""
    if (r < 0.5) {
        newName = "Best Business"
    } else {
        newName = "Worst Business"
    }
    document.getElementById("nameInput").value = newName;
    return newName
  }
  
  function createBusiness() {
    setName(document.getElementById("nameInput").value)
    if (name === "") {
        setName(createName());
    }
    setStats([0,0,0,0,0,0,0])
    setExists(true)
  }

  if (exists == true) {
    return (
        <main>
            <div>
                <h1>Business Name: {name}</h1>
            </div>
            <div className="rows">
                <div id="infoList" className="items">
                    Stats:
                    <div>Balance: <span className="stat">${stats[0]}</span></div>
                    <div>Income Per Day: <span className="stat">${stats[1]}</span></div>
                    <div>Costs Per Day: <span className="stat">${stats[2]}</span></div>
                    <div>Net Per Day: <span className="stat">${stats[3]}</span></div>
                    <div>Average Wage: <span className="stat">${stats[4]}</span></div>
                    <div>Employees: <span className="stat">{stats[5]}</span></div>
                    <div>Costumers Per Day: <span className="stat">{stats[6]}</span></div><br />
                    <button id="restartButton" onClick={deleteBusiness}>Restart/Delete Business</button><br />
                    <button id="questioningButton" onClick={stepTwo}>Are you sure?</button>
                </div>
                <div id="mainEvent" className="items">
                    <p>Balance(dollars) over time(months):</p>
                    <div>3,000</div>
                    <svg id="graph" width="175" height="175" viewBox="0 0 150 150">
                        <polyline className='border-line' points="0,0 0,150 150,150"/>
                        <polyline className='graph-line' points="0,150 25,75 50,85 75,75 150,25"/>
                    </svg>
                    <div>0&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;7
                    </div>
                </div>
                <div id="eventHistory" className="items">
                    Event History:<br />
                    <div><span className="time">(3 min ago)</span> Event "<span className="event">Theft!</span>"</div>
                    <div>You chose the option "<span className="option">More Security</span>" which caused the effect(s):</div>
                    (<span className="bad">-1 employee</span>, <span className="good">-100 cost per day</span>, <span className="bad">-50 balance</span>)
                    <div><span className="time">(4 hours ago)</span> Event "<span className="event">Lawsuit over Logo</span>"</div>
                    <div>You chose the option "<span className="option">Settle</span>" which caused the effect(s):</div>
                    (<span className="bad">-1,000 balance</span>)
                    <div><span className="time">(3 days ago)</span> Event "<span className="event">Generous Gift</span>"</div>
                    <div>you chose the option "<span className="option">Accept</span>" which caused the effect(s):</div>
                    (<span className="good">+1,643 balance</span>)
                </div>
                <div id="eventsQueue" className="items">
                    Pending Events:<br />
                    -- NONE --
                </div>
            </div>
        </main>
    );
  } else {
    return (
        <main>
            <div id="makeDiv">
            <input id="nameInput" type="text" placeholder="Name your business"></input>
            <button className="nameButtons" onClick={createName}>Random Name</button>
            <button className="nameButtons" onClick={createBusiness}>Create Business</button>
            </div>
        </main>
    )
  }
}
