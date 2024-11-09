import React from 'react';

export function Login() {
  return (
    <main>
        <h1>Welcome to my Economy Sim</h1>
          <div className="white_space"></div>
          <form method="get" id="loginForm" action="score.html">
              <div className="white_space"></div>
              <div className="aq_box">
                  Login:<br />
                  <input className="aq_item" type="text" placeholder="Enter Email or Username" /><br />
                  <input className="aq_item" type="text" placeholder="Enter Password" /><br />
                  <button className="aq_item" type="submit">Submit</button>
              </div>
              <div className="lower_div">-- OR --</div>
              <div className="aq_box">
                  Sign Up:<br />
                  <input className="aq_item" type="text" placeholder="Enter Email" /><br />
                  <input className="aq_item" type="text" placeholder="Enter Username" /><br />
                  <input className="aq_item" type="text" placeholder="Enter Password" /><br />
                  <input className="aq_item" type="text" placeholder="Confirm Password" /><br />
                  <button className="aq_item" type="submit">Submit</button>
              </div>
              <div className="white_space"></div>
          </form>
          <div className="white_space"></div>
      </main>
  );
}