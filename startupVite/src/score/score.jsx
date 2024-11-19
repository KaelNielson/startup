import React from 'react';
import './score.css';

export function Score() {
    class row {
        constructor(name, busName, balance) {
            this.name = name
            this.busName = busName
            this.balance = balance
        }

        render(placing){
            return (
                <tr key={placing}>
                    <td className="smallerSegments">{placing}</td>
                    <td className="largerSegments">{this.name}</td>
                    <td className="largerSegments">{this.busName}</td>
                    <td className="largerSegments">{this.balance}</td>
                </tr>
            )
        }
    }

    let top1 = new row("SomeGuy", "Jumping Tangerines", "$7,000,000")
    let top2 = new row("AnotherGuy", "Triple Quarter", "$3,000,000")
    let top3 = new row("LadyWord", "Petrified Brick", "$1,000,002")
    let top4 = new row("yourName", "Best Business", "$2,735")

    const [rows, setRows] = React.useState([top2, top1, top3, top4])

    function balanceToNumber(balance) {
        return Number(balance.replaceAll(",", "").replace("$", ""))
    }

    function sortFn(r1, r2) {
        let num1 = balanceToNumber(r1.balance)
        let num2 = balanceToNumber(r2.balance)
        return num2 - num1
    }

    function dotDotDot() {
        return (
            <tr key="dot">
                <td className="smallerSegments">....</td>
                <td className="largerSegments">....</td>
                <td className="largerSegments">....</td>
                <td className="largerSegments">....</td>
            </tr>
        )
    }

    function renderRows() {
        let final = [];
        let orderedRows = rows.sort(sortFn)
        if (orderedRows.length <= 3) {
            for (let r in orderedRows) {
                final.push(orderedRows[r].render(Number(r)+1))
            }
        } else {
            for (let r = 0; r < 3; r++) {
                final.push(orderedRows[r].render(Number(r)+1))
            }
            final.push(dotDotDot())
        }
        return final
    }
    return (
        <main className='main'>
            <h1>Scoreboard:</h1>
            <div className="white_space"></div>
            <table id="scoreboard">
                <tbody>
                <tr>
                    <th className="smallerSegments">  #  </th>
                    <th className="largerSegments">  Username  </th>
                    <th className="largerSegments">  Business Name  </th>
                    <th className="largerSegments">  Wealth  </th>
                </tr>
                {/* {top1.render(1)} */}
                {renderRows()}
                </tbody>
                {/* <tr>
                    <td className="smallerSegments">1</td>
                    <td className="largerSegments">SomeGuy</td>
                    <td className="largerSegments">Jumping Tangerines</td>
                    <td className="largerSegments">$7,000,000</td>
                </tr>
                <tr>
                    <td className="smallerSegments">2</td>
                    <td className="largerSegments">AnotherGuy</td>
                    <td className="largerSegments">Triple Quarter</td>
                    <td className="largerSegments">$3,000,000</td>
                </tr>
                
                <tr>
                    <td className="smallerSegments">3</td>
                    <td className="largerSegments">LadyWord</td>
                    <td className="largerSegments">Petrified Brick</td>
                    <td className="largerSegments">$1,000,002</td>
                </tr>
                <tr>
                    <td className="smallerSegments">...</td>
                    <td className="largerSegments">...</td>
                    <td className="largerSegments">...</td>
                    <td className="largerSegments">...</td>
                </tr>
                <tr>
                    <td className="smallerSegments">25</td>
                    <td className="largerSegments">yourName</td>
                    <td className="largerSegments">Best Business</td>
                    <td className="largerSegments">$2,735</td>
                </tr> */}
            </table>
            <div className="white_space"></div>
            <div id="searchDiv">
                <p id="emoji">&#128270;</p><input id="searchBar" type="text" placeholder="search users" />
            </div>
        </main>
    );
}