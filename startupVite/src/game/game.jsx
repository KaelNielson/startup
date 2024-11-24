import React from 'react';
import "./game.css"
import { secretKey } from "./apiCall.jsx"

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1)
}

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
        this.net = this.totalIncome - this.totalCosts;
    }

    recalcNet() {
        this.net = this.totalIncome - this.totalCosts;
        return this
    }

    recalcCosts () {
        this.totalCosts = this.baseCosts + this.employees * this.wage;
        return this
    }

    recalcIncome () {
        this.totalIncome = this.baseIncome + this.customer * this.paying;
        return this
    }

    dailyRecalc(stChanger) {
        stChanger(this.recalcNet())
        this.balance = this.balance + this.net;
        return this
    }

    fullRecalc(stChanger) {
        stChanger(this.recalcCosts())
        stChanger(this.recalcIncome())
        stChanger(this.recalcNet())
        return this
    }

}



export function Game() {
    const [exists, setExists] = React.useState(false);
    const [name, setName] = React.useState("")
    const [stats, setStats] = React.useState(new statList(0,0,0,0,0,0,0))
    const [weeks, setWeeks] = React.useState(0)
    const [graphColor, setColor] = React.useState("good-graph-line")
    const [balances, setBalances] = React.useState([0])
    const [pendingEvents, setEvents] = React.useState([])
    const [points, setPoints] = React.useState("")
    const [showingEvents, setShowing] = React.useState(false)
    const [reports, setReports] = React.useState([])
    const [highestCash, setHighestCash] = React.useState(1)
    // const weeksRef = React.useRef(weeks)

    // React.useEffect(() => {weeksRef.current = weeks}, [weeks])

    class effect {
        constructor(target, amount) {
            this.target = target;
            this.amount = amount;
            if (this.amount < 0) {this.text = this.amount.toString() + " " + this.target;}
            else {this.text = "+" + this.amount.toString() + " " + this.target;}
            if ((this.target === "income") || (this.target === "costs") || (this.target === "customers")) {
                this.text += " per day"
            }
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
            setStats(stats.fullRecalc(setStats))
        }
    }
    
    class option {
        constructor(name, text, effects) {
            this.text = text;
            this.effects = effects;
            this.name = name
        }

        toString() {
            return this.name
        }
    
        choose(ogEvent) {
            let ef = this.effects
            let op = this
            function f () {
                for (let effect in ef) {
                    ef[effect].activate();
                }
                setShowing(false)
                ogEvent.chooseOption(op)
            }
            return f
        }
    
        render(ogEvent) {
            return (
                <div className="optionStyle">{this.text}<br /><button onClick={this.choose(ogEvent)}>Accept</button></div>
                
            )
        }
    }
    
    class Event {
        constructor(name, text, options) {
            this.name = name;
            this.text = text;
            this.options = options;
        }
    
        chooseOption(op) {
            setReports(reports.concat([(report(this, op, Date.now()))]))
            setEvents(pendingEvents.splice(pendingEvents.indexOf(this), 1))
            runAWeek()
            
        }
    
        render() {
            return (
                <div className="eventRender">
                    <h2>{this.name}</h2>
                    <p>
                        {this.text}
                    </p>
                    <div className = "optionsDiv">
                    {this.options.map(op => 
                        <span key={this.options.indexOf(op)}>{op.render(this)}</span>
                    )}
                    </div>
                </div>
            )
        }

        shorthand() {
            return (
                <div>
                    {this.name}
                    <button id="viewButton" onClick={showEvents}>View</button>
                </div>
            )
        }
    }
    let e1 = [new effect("balance", -5000), new effect("income", 200), new effect("costs", 2000), new effect("employees", 4), new effect("wage", 128), new effect("customers", 200), new effect("paying", 15)]
    let e2 = [new effect("balance", 0), new effect("income", 10), new effect("costs", 1000), new effect("employees", 1), new effect("wage", 160), new effect("customers", 50), new effect("paying", 20)]
    let e3 = [new effect("balance", 1000), new effect("income", 0), new effect("costs", 10000), new effect("employees", 10), new effect("wage", 350), new effect("customers", 35), new effect("paying", 850)]
    let e4 = [new effect("balance", 15), new effect("income", 0), new effect("costs", 10), new effect("employees", 0), new effect("wage", 0), new effect("customers", 5), new effect("paying", 500)]
    let e5 = [new effect("balance", 20)]
    let e6 = [new effect("customer", 1)]
    let firstText = "You've told your family and friends that you want to start a business, and now everyone wants to be your business mentor."
    let secondText = "You're walking to your business one day when you see a wallet on the ground. Picking it up, you find 20 dollars and an ID inside. You reach your business and find two customers waiting for you to arrive."
    let op1Text = "Your father approaches you at your desk where you're brainstorming. 'I've heard that Billy down the street is selling his gas station. He's an ol' pal of mine and I bet I could help you get it for a discount. I've done some work in that business in the past too-'"
    let op2Text = "Your mother shoes your father away and says: 'Enough of that nonsense. Me ma just passed away and left her bakery to no one. Surely there be no better boy to run it then you. With me cooking of course."
    let op3Text = "Your rich uncle, who you've only met once, bursts in in a disheveled three-piece suit. It looks like he's run all the way here. 'My little (nephew or niece) is finally an entrepurer!' He shouts. 'Don't worry one bit about starting capital, I'll bankroll you a high-end restaurant. I've got buddies in the chef business, you won't have to worry about a thing.'"
    let op4Text = "Your dropout friend from highschool speaks up from the couch, causing everyone to remember that he's here. 'Listen, man, you don't need to worry about any fancy buildings or merchendise or anything, cause I heard that Ricky left to Wisconsin the other day, so there's no one around to sell...uh...lettuce.' Your parents give him a disapproving side-eye.'"
    let op5Text = "One of the customers, a man in a golden tuxedo, notices the wallet. 'Hey, that's good luck. Wish I'd found 20 dollars on the street.'"
    let op6Text = "The other customer, an elderly woman, looks up from the merchendise and figures out what the man is talking about. 'You're going to pocket the money? But that would be stealing. It's got an ID in it, be sure it's returned properly.'"
    let op1 = new option("Dad's Gas Station", op1Text, e1)
    let op2 = new option("Mum's Bakery", op2Text, e2)
    let op3 = new option("Alfred's Restaurant", op3Text, e3)
    let op4 = new option("Ricky's Backyard Deals", op4Text, e4)
    let op5 = new option("Pocket the money.", op5Text, e5)
    let op6 = new option("Return the wallet.", op6Text, e6)
    let firstEvent = new Event("Starting a business?", firstText, [op1, op2, op3, op4])
    let secondEvent = new Event("A stroke of luck?", secondText, [op5, op6])

    function definePoints(max) {
        let allPoints = "0,150 "
        // console.log(max)
        for (let b = 1; b < balances.length; b++) {
            allPoints += `${150/b},${150 - balances[b] * (150/max)} `
        }
        return allPoints
    }

    function runAWeek() {
        setWeeks(weeks + 1)
        for (let i = 0; i < 7; i++) {
            setStats(stats.dailyRecalc(setStats))
        }
        setBalances(balances.concat([stats.balance]))
        console.log(balances)
        if (balances[-1] < balances[-2]) {
            setColor("bad-graph-line")
        } else {
            setColor("good-graph-line")
        }
        console.log(stats.balance)
        if (stats.balance > highestCash) {
            setHighestCash(stats.balance)
        } else if (stats.balance < -1*highestCash) {
            setHighestCash(-1*stats.balance)
        }
        // wait(weeks)
    }

    function report(ev, op, time) {
        let printTime;
        let elapsedSeconds = Date.now() - time/1000000
        let elapsedMinutes = elapsedSeconds/60
        let elapsedHours = elapsedMinutes/60
        let elapsedDays = elapsedHours/24
        let elapsedYears = elapsedDays/365
        let allEffects = []
        if (elapsedMinutes < 1) {printTime = "(Less than a minute ago)"}
        else if (elapsedHours < 1) {printTime = "(" + elapsedMinutes + "minute(s) ago)"}
        else if (elapsedDays < 1) {printTime = "(" + elapsedHours + "hour(s) ago)"}
        else if (elapsedYears < 1) {printTime = "(" + elapsedYears + "year(s) ago)"}
        for (let e in op.effects) {
            
            let goodOrBad = "bad"
            if (op.effects[e].target == "costs") {
                if (op.effects[e].amount < 0) {
                    goodOrBad = "good";
                }
            } else {
                if (op.effects[e].amount > 0) {
                    goodOrBad = "good"
                }
            }
            
            allEffects.push(<span className={goodOrBad}>{op.effects[e].text}</span>)
        }
        return (
            <>
                <div><span className="time">{printTime}</span> Event "<span className="event">{ev.name}</span>"</div>
                <div>You chose the option "<span className="option">{op.name}</span>" which caused the effect(s):</div>
                ({allEffects.map( e => 
                    <span key={allEffects.indexOf(e)}>{e}, </span>
                )})
            </>
        )
    }

    function deleteBusiness() {
        document.getElementById("restartButton").style.display = "none"
        document.getElementById("questioningButton").style.display = "block"
    }

    function stepTwo() {
        setExists(false)
        setName("")
        setStats(new statList(0,0,0,0,0,0,0))
        setWeeks(0)
        setColor("good-graph-line")
        setBalances([0])
        setEvents([])
        setPoints("")
        setShowing(false)
        setReports([])
        setHighestCash(1)
    }

    function waitingForName() {
        document.getElementById("nameInput").value = "Loading..."
        createName()
    }

    async function createName() {
        let newName = ""
        //adjective
        await fetch("https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=adjective&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=" + secretKey) //But how to use key?
        .then((response) => response.json())
        .then((data) => {
            newName += capitalize(data.word);
        })
        .catch();
        newName += " ";
        //noun
        await fetch("https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=" + secretKey)
        .then((response) => response.json())
        .then((data) => {
            newName += capitalize(data.word);
        })
        .catch();
        document.getElementById("nameInput").value = newName
        return newName
    }

    function showEvents() {
        setShowing(true)
    }

    function unShowEvents() {
        setShowing(false)
    }
  
    async function createBusiness() {
        let v = document.getElementById("nameInput").value
        
        
        if (v === "") {
            document.getElementById("nameInput").value = "You need a business name first."
        } else {
            setName(v)
            setStats(new statList(0,0,0,0,0,0,0))
            setExists(true)
            let temp = [firstEvent]
            setEvents(pendingEvents.concat(temp))
        }
    }

    if (exists == true) {
        if (showingEvents == false) {
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
                            <div>Costumers Per Day: <span className="stat">{stats.customer}</span></div>
                            <div>Dollars per Costumer: <span className="stat">${stats.paying}</span></div><br />
                            <button id="restartButton" onClick={deleteBusiness}>Restart/Delete Business</button><br />
                            <button id="questioningButton" onClick={stepTwo}>Are you sure?</button>

                        </div>
                        <div id="mainEvent" className="items">
                            <p>Balance(dollars) over time(weeks):</p>
                            <div>{highestCash}</div>
                            <div className="fullGraph">
                                <span>0</span>
                                <svg id="graph" width="175" height="150" viewBox="0 0 175 300">
                                    <polyline className='border-line' points="0,0 0,150 175,150"/>
                                    <polyline className="border-line" points="0,150 0,300"/>
                                    <polyline className={graphColor} points={definePoints(highestCash)}/>
                                </svg>
                                <span>{weeks}</span>
                            </div>
                            <div>{`-${highestCash}`}</div>
                            {/* <div>0&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{weeks}
                            </div> */}
                        </div>
                        <div id="eventHistory" className="items">
                            Event History:<br />
                            {reports[0]}
                        </div>
                        <div id="eventsQueue" className="items">
                            Pending Events:<br />
                            You have <span>{pendingEvents.length}</span> event(s):
                            {pendingEvents.map(ev =>
                                <span key={pendingEvents.indexOf(ev)}>{ev.shorthand()}</span>
                            )}
                        </div>
                    </div>
                </main>
            );
        } else {
            return (
                <main>
                    <div>
                        <h1>Business Name: {name}</h1>
                    </div>
                    {pendingEvents[0].render()} 
                    <button onClick={unShowEvents}>Back</button>
                </main>
            )
        }
    } else {
        return (
            <main>
                <div id="makeDiv">
                <input id="nameInput" type="text" placeholder="Name your business"></input>
                <button className="nameButtons" onClick={waitingForName}>Random Name</button>
                <button className="nameButtons" onClick={createBusiness}>Create Business</button>
                </div>
            </main>
        )
    }
}
