import React from 'react';
import './login.css'

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

    async function userStuff() {
        if (document.getElementById("entEmailNew").value != "") {
            await makeNewUser()
        } else if (document.getElementById("entEmUs").value != "") {
            await signInUser()
        } else {
            throwError("Please fill in one of the forms.")
        }
    }

    async function makeNewUser() {
        let e = document.getElementById("entEmailNew").value
        let n = document.getElementById("entNameNew").value
        let p1 = document.getElementById("entPass1").value
        let p2 = document.getElementById("entPass2").value
        if (p1 != p2) {
            throwError("Your password's don't match")
        } else {
            let u = new User(n, e, p1)
            await create(u)

        } 
    }

    async function signInUser() {
        await login(ocument.getElementById("entEmUs").value, ocument.getElementById("entPass").value)
    }

    async function login(nameOrEmail, password) {
        const endpoint = "auth/login"
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
        const endpoint = "auth/create"
        const response = await fetch(endpoint, {
            method: 'post',
            body: user,
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

    return (
        <main>
            <h1>Welcome to my Economy Sim</h1>
            <div className="white_space" id="errorMessage">{errorMsg}</div>
            <form method="get" id="loginForm" onSubmit={userStuff}>
                <div className="white_space"></div>
                <div className="aq_box">
                    Login:<br />
                    <input type="text" placeholder="Enter Email or Username" id="entEmUs"/><br />
                    <input type="text" placeholder="Enter Password" id="entPass"/><br />
                    <button type="submit">Submit</button>
                </div>
                <div className="lower_div">-- OR --</div>
                <div className="aq_box">
                    Sign Up:<br />
                    <input type="text" placeholder="Enter Email" id="entEmailNew" /><br />
                    <input type="text" placeholder="Enter Username" id="entNameNew"/><br />
                    <input type="text" placeholder="Enter Password" id="entPass1"/><br />
                    <input type="text" placeholder="Confirm Password" id="entPass2"/><br />
                    <button type="submit">Submit</button>
                </div>
                <div className="white_space"></div>
            </form>
            <div className="white_space"></div>
        </main>
    );
}