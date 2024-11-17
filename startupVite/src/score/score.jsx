import React from 'react';
import './score.css';

export function Score() {
    class row {
        constructor(placing, name, busName, balance) {
            this.placing = placing
            this.name = name
            this.busName = busName
            this.balance = balance
        }

        render(){
            return (
                <tr>
                    <td className="smallerSegments">{this.placing}</td>
                    <td className="largerSegments">{this.name}</td>
                    <td className="largerSegments">{this.busName}</td>
                    <td className="largerSegments">{this.balance}</td>
                </tr>
            )
        }
    }

    let top1 = new row(1, "SomeGuy", "Jumping Tangerines", "$7,000,000")

    return (
        <main className='main'>
            <h1>Scoreboard:</h1>
            <div className="white_space"></div>
            <table id="scoreboard">
                <tr>
                    <th className="smallerSegments">  #  </th>
                    <th className="largerSegments">  Username  </th>
                    <th className="largerSegments">  Business Name  </th>
                    <th className="largerSegments">  Wealth  </th>
                </tr>
                <tr>
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
                </tr>
            </table>
            <div className="white_space"></div>
            <div id="searchDiv">
                <p id="emoji">&#128270;</p><input id="searchBar" type="text" placeholder="search users" />
            </div>
        </main>
    );
}