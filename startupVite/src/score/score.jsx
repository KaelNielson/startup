import React from 'react';

export function Score() {
  return (
    <main>
            <h1>Scoreboard:</h1>
            <div className="white_space"></div>
            <table id="scoreboard">
                <tr>
                    <th>  #  </th>
                    <th>  Username  </th>
                    <th>  Business Name  </th>
                    <th>  Wealth  </th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>SomeGuy</td>
                    <td>Jumping Tangerines</td>
                    <td>$7,000,000</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>AnotherGuy</td>
                    <td>Triple Quarter</td>
                    <td>$3,000,000</td>
                </tr>
                
                <tr>
                    <td>3</td>
                    <td>LadyWord</td>
                    <td>Petrified Brick</td>
                    <td>$1,000,002</td>
                </tr>
                <tr>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                    <td>...</td>
                </tr>
                <tr>
                    <td>25</td>
                    <td>yourName</td>
                    <td>Best Business</td>
                    <td>$2,735</td>
                </tr>
            </table>
            <div className="white_space"></div>
            <div id="searchDiv">
                &#128270
                <input id="searchBar" type="text" placeholder="search users" />
            </div>
        </main>
  );
}