import React from 'react';
import './login.css'

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MessageDialog(props) {
    return (
      <Modal {...props} show={props.message} centered>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export function Login() {
    const [errorMsg, setError] = React.useState("")

    function throwError(msg) {
        setError(msg)
        console.log(msg)
    }

    class User {
        constructor (name, email, password) {
            this.name = name
            this.email = email
            this.password = password
            this.business = null;
            this.token = null;
        }
    }

    async function makeNewUser() {
        let e = document.getElementById("entEmailNew").value
        let n = document.getElementById("entNameNew").value
        let p1 = document.getElementById("entPass1").value
        let p2 = document.getElementById("entPass2").value
        if ((e === "") || (n === "") || (p1 === "") || (p2 === "")) {
            throwError("Please fill in the form")
        } else if (p1 != p2) {
            throwError("Your password's don't match")
        } else {
            let u = new User(n, e, p1)
            await create(u)

        } 
    }

    async function signInUser() {
        let u = document.getElementById("entEmUs").value
        let p = document.getElementById("entPass").value
        if ((u === "") || (p === "")) {
            throwError("Please fill in the form")
        }
        await login(u, p)
    }

    async function login(nameOrEmail, password) {
        const endpoint = "api/auth/login"
        const response = await fetch(endpoint, {
            method: 'post',
            body: { user:nameOrEmail, password: password },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        });
        if (response?.status === 200) {
            window.location.href = "/score"
        } else {
            const body = await response.json();
            throwError(`⚠ Error: ${body.msg}`)
        }
    }

    async function create(user) {
        console.log("Got to create")
        const endpoint = "api/auth/create"
        console.log("I'm guess it happens here")
        const response = await fetch(endpoint, {
            method: 'post',
            body: user,
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        });
        console.log("Not here")
        if (response?.status === 200) {
            window.location.href = "/score"
        } else {
            const body = await response.json();
            throwError(`⚠ Error: ${body.msg}`)
        }
    }

    return (
        <>
        <main>
            <h1>Welcome to my Economy Sim</h1>
            <div className="white_space"></div>\
            <div className="form">
                <div className="white_space"></div>
                <div className="aq_box">
                    Login:<br />
                    <input type="text" placeholder="Enter Email or Username" id="entEmUs"/><br />
                    <input type='password' placeholder="Enter Password" id="entPass"/><br />
                    <button type="submit" onClick={signInUser}>Submit</button>
                </div>
                <div className="lower_div">-- OR --</div>
                <div className="aq_box">
                    Sign Up:<br />
                    <input type="text" placeholder="Enter Email" id="entEmailNew" /><br />
                    <input type="text" placeholder="Enter Username" id="entNameNew"/><br />
                    <input type='password' placeholder="Enter Password" id="entPass1"/><br />
                    <input type='password' placeholder="Confirm Password" id="entPass2"/><br />
                    <button type="submit" onClick={makeNewUser}>Submit</button>
                </div>
                <div className="white_space"></div>
            </div>
            <div className="white_space"></div>

        </main>
        <MessageDialog message={errorMsg} onHide={() => setError(null)} />
        </>
    );
}