const express = require('express');
const uuid = require('uuid');
const app = express();

let users = [];
let scores = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.use(express.static('public'));

app.use(express.json());

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
    for (let user in users) {
        if (users[user].name === req.body.name) {
            res.status(409).send({ msg: "Username already in use" })
        } else if (users[user].name === req.body.email) {
            res.status(409).send({ msg: "Account with that email already exists" })
        }
    }
    const user = req.body
    user.token = uuid.v4()
    users.push(user)
    res.send({ token: user.token });
    });