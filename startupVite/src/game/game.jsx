import React from 'react';
import "./game.css"

class statList {
    constructor(balance, baseIncome, baseCosts, wage, employees, customer, paying) {
        this.balance = balance;
        this.baseIncome = baseIncome;
        this.baseCosts = baseCosts;
        this.wage = wage;
        this.employees = employees;
        this.customer = customer;
        this.paying = paying;
        this.totalCosts = this.baseCosts + this.employees * this.wage;
        this.totalIncome = this.baseIncome + this.customer * this.paying;
        this.net = this.income - this.costs;
    }

    recalcNet() {
        this.net = this.totalIncome - this.totalCosts;
    }

    recalcCosts () {
        this.totalCosts = this.baseCosts + this.employees * this.wage;
    }

    recalcIncome () {
        this.totalIncome = this.baseIncome + this.customer * this.paying;
    }

    dailyRecalc() {
        this.recalcNet()
        this.balance = this.balance + this.net;
    }

    fullRecalc() {
        this.recalcCosts()
        this.recalcIncome()
        this.recalcNet()
        this.dailyRecalc()
    }

}



export function Game() {
    const [exists, setExists] = React.useState(false);
    const [name, setName] = React.useState("")
    const [stats, setStats] = React.useState(new statList(0, 0, 0, 0, 0, 0, 0))
    const [weeks, setWeeks] = React.useState(0)
    const [months, setMonths] = React.useState(0)
    const [graphColor, setColor] = React.useState("good-graph-line")
    const [balances, setBalances] = React.useState([0])
    const [pendingEvents, setEvents] = React.useState([])
    const [points, setPoints] = React.useState("")

    class effect {
        constructor(target, amount) {
            this.target = target;
            this.amount = amount;
        }
    
        activate() {
            if (this.target == "balance") {
                stats.balance = stats.balance + this.amount;
            } else if (this.target == "income") {
                stats.baseIncome = stats.baseIncome + this.amount;
            } else if (this.target == "costs") {
                stats.baseCosts = stats.baseCosts + this.amount;
            } else if (this.target == "wage") {
                stats.wage = stats.wage + this.amount;
            } else if (this.target == "employees") {
                stats.employees = stats.employees + this.amount;
            } else if (this.target == "customers") {
                stats.customer = stats.customer + this.amount;
            } else if (this.target == "paying") {
                stats.paying = stats.paying + this.amount;
            }
            stats.totalRecalc()
        }
    }
    
    class option {
        constructor(text, effects) {
            this.text = text;
            this.effects = effects;
        }
    
        choose() {
            for (let effect in this.effects) {
                this.effects[effect].activate();
            }
        }
    
        render() {
            return (
                <div>{this.text}<button onClick={this.choose}>Accept</button></div>
                
            )
        }
    }
    
    class Event {
        constructor(name, text, options) {
            this.name = name;
            this.text = text;
            this.options = options;
            this.renderedOptions = []
            for (let option in this.options) {
                this.renderedOptions.push(this.options[option].render())
            }
        }
    
        chooseOption(index) {
            this.options[index].choose()
        }
    
        render() {
            return (
                <>
                    <p>
                        {this.text}
                    </p>
                    <div className = "optionsDiv">
                    {this.renderedOptions}
                    </div>
                </>
            )
        }
    }
    let e1 = [new effect("balance", -5000), new effect("income", 200), new effect("costs", 2000), new effect("employees", 4), new effect("wage", 128), new effect("customers", 200), new effect("paying", 15)]
    let e2 = [new effect("balance", 0), new effect("income", 10), new effect("costs", 1000), new effect("employees", 1), new effect("wage", 160), new effect("customers", 50), new effect("paying", 20)]
    let e3 = [new effect("balance", 1000), new effect("income", 0), new effect("costs", 10000), new effect("employees", 10), new effect("wage", 350), new effect("customers", 35), new effect("paying", 850)]
    let e4 = [new effect("balance", 15), new effect("income", 0), new effect("costs", 10), new effect("employees", 0), new effect("wage", 0), new effect("customers", 5), new effect("paying", 500)]
    let firstText = "You've told your family and friends that you want to start a business, and now everyone wants to be your business mentor."
    let op1Text = "Your father approaches you at your desk where you're brainstorming. 'I've heard that Billy down the street is selling his gas station. He's an ol' pal of mine and I bet I could help you get it for a discount. I've done some work in that business in the past too-'"
    let op2Text = "Your mother shoes your father away and says: 'Enough of that nonsense. Me ma just passed away and left her bakery to no one. Surely there be no better boy to run it then you. With me cooking of course."
    let op3Text = "Your rich uncle, who you've only met once, bursts in in a disheveled three-piece suit. It looks like he's run all the way here. 'My little (nephew or niece) is finally an entrepurer!' He shouts. 'Don't worry one bit about starting capital, I'll bankroll you a high-end restaurant. I've got buddies in the chef business, you won't have to worry about a thing.'"
    let op4Text = "Your dropout friend from highschool speaks up from the couch, causing everyone to remember that he's here. 'Listen, man, you don't need to worry about any fancy buildings or merchendise or anything, cause I heard that Ricky left to Wisconsin the other day, so there's no one around to sell...uh...lettuce.' Your parents give him a disapproving side-eye.'"
    let op1 = new option(op1Text, e1)
    let op2 = new option(op2Text, e2)
    let op3 = new option(op3Text, e3)
    let op4 = new option(op4Text, e4)
    let firstEvent = new Event("Starting a business?", firstText, [op1, op2, op3, op4])

    function runAMonth() {
        setMonths(months + 1);
        balances.push(stats.balance)
        if (balances[-2] <= balances[-1]) {
            setColor("good-graph-line")
        } else {
            setColor("bad-graph-line")
        }
    }

    function runAWeek() {
        setWeeks(weeks + 1)
        for (let i = 0; i < 7; i++) {
            stats.dailyRecalc()
        }
        setBalances(balances + [stats.balance])
        if (weeks % 4 == 0) {
            runAMonth()
        }
    }

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
  
    async function createBusiness() {
        let v = document.getElementById("nameInput").value
        
        
        if (v === "") {
            setName(createName());
        } else {
            setName(v)
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
                        <div>Balance: <span className="stat">${stats.balance}</span></div>
                        <div>Income Per Day: <span className="stat">${stats.totalIncome}</span></div>
                        <div>Costs Per Day: <span className="stat">${stats.totalCosts}</span></div>
                        <div>Net Per Day: <span className="stat">${stats.net}</span></div>
                        <div>Average Wage: <span className="stat">${stats.wage}</span></div>
                        <div>Employees: <span className="stat">{stats.employees}</span></div>
                        <div>Costumers Per Day: <span className="stat">{stats.customer}</span></div><br />
                        <button id="restartButton" onClick={deleteBusiness}>Restart/Delete Business</button><br />
                        <button id="questioningButton" onClick={stepTwo}>Are you sure?</button>
                    </div>
                    <div id="mainEvent" className="items">
                        <p>Balance(dollars) over time(months):</p>
                        <div>3,000</div>
                        <svg id="graph" width="175" height="175" viewBox="0 0 150 150">
                            <polyline className='border-line' points="0,0 0,150 150,150"/>
                            <polyline className='good-graph-line' points="0,150 25,75 50,85 75,75 150,25"/>
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
                        You have <div>{pendingEvents.length}</div> events.
                        <a href="/event">
                            <button id="viewButton" >View</button>
                        </a>
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
