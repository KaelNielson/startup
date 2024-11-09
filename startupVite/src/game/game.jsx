import React from 'react';

export function Game() {
  return (
    <main>
        <div>
            <h1>Business Name: Best Business</h1>
        </div>
        <div className="rows">
            <div id="infoList" className="items">
                Stats:
                <div>Balance: <span className="stat">$2,735</span></div>
                <div>Income Per Day: <span className="stat">$70</span></div>
                <div>Costs Per Day: <span className="stat">$35</span></div>
                <div>Net Per Day: <span className="stat">$35</span></div>
                <div>Employees: <span className="stat">1</span></div>
                <div>Costumers Per Day: <span className="stat">10</span></div><br />
                <button id="restartButton">Restart/Delete Business</button><br />
                <button id="questioningButton">Are you sure?</button>
            </div>
            <div id="mainEvent" className="items">
                <p>Balance(dollars) over time(months):</p>
                <p>3,000</p>
                {/* <svg id="graph" width="175" height="175" viewBox="0 0 150 150">
                    <polyline points="0,0 0,150 150,150" style="fill:none;stroke:black;stroke-width: 1;"/>
                    <polyline points="0,150 25,75 50,85 75,75 150,25" style="fill:none;stroke:green;stroke-width:1"/>
                </svg>
                <p>0&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    7
                </p> */}
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
}