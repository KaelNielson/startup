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
    if (await DB.getUserByName(req.body.name)) {
        res.status(409).send({ msg: "Username already in use" })
    } else if (await DB.getUserByEmail(req.body.email)) {
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
    console.log("Does it get here?")
    const userTry1 = await DB.getUserByName(req.body.user)
    const userTry2 = await DB.getUserByEmail(req.body.user)
    const actualUser = (userTry1 || userTry2)
    if (actualUser) {
        if (await bcrypt.compare(req.body.password, actualUser.password)) {
            setAuthCookie(res, actualUser.token);
            res.send({ id: actualUser._id, user:actualUser });
            return;
        } else {
            res.status(401).send({ msg:"Incorrect Password" }) 
        }
    } else {
        res.status(401).send({ msg:"User does not exist." })
    }
})

apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});

// GetScores
secureApiRouter.get('/scores', async (req, res) => {
    const scores = await DB.getHighScores();
    res.send(scores);
});
    
// SubmitScore
secureApiRouter.post('/score', async (req, res) => {
    const score = { ...req.body, ip: req.ip };
    await DB.addScore(score);
    const scores = await DB.getHighScores();
    res.send(scores);
});

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
}
  
const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
  

