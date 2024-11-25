const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

let users = [];
let scores = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

app.set('trust proxy', true);

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
    if (await getUserByName(req.body.name)) {
        res.status(409).send({ msg: "Username already in use" })
    } else if (await getUserByEmail(req.body.email)) {
        res.status(409).send({ msg: "Email already in use" })
    } else {
        const user = await DB.createUser(req.body.name, req.body.email, req.body.password);

        setAuthCookie(res, user.token);

        res.send({
            id: user._id,
          });
    }
    });

apiRouter.post('/auth/login', async (req, res) => {
    const thisGuy = null
    const nameQuery = await users.find({name: req.body.user}).toArray()
    const emailQuery = await users.find({email: req.body.user}).toArray()
    if (nameQuery.length != 0) {
        const thisGuy = nameQuery[0]
    } else if (emailQuery.length != 0) {
        const thisGuy = emailQuery[0]
    }
    if (thisGuy != null) {
        if (thisGuy.password == req.body.password) {

        } else {
            res.status(401).send({ msg:"Incorrect Password" })
        }
    } else {
        res.status(401).send({ msg:"User does not exist." })
    }
    for (let user in users) {
        if ((users[user].name === req.body.user ) || (users[user].email === req.body.user)) {
            if (users[user].password === req.body.password) {
                user.token = uuid.v4();
                res.send({ token: user.token });
                return;
            } else {
                res.status(401).send({ msg:"Incorrect Password" })
            }
        }
    }
    res.status(401).send({ msg:"User does not exist." })
})


// GetScores
apiRouter.get('/scores', (_req, res) => {
    res.send(scores);
});
    
// SubmitScore
apiRouter.post('/score', (req, res) => {
    scores = updateScores(req.body, scores);
    res.send(scores);
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
    });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    });


