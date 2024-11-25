const express = require('express');
const uuid = require('uuid');
const { mongoClient } = require('mongodb');
const { config } = require('./dbConfig.json')
const app = express();

async function main() {
    const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
    const client = new mongoClient(url)
    const db = client.db('econSim')
    const users = db.collection("users")
    const scores = db.collection("scores")
    
    (async function testConnection() {
            await client.connect();
            await db.command({ ping: 1 });
        })().catch((ex) => {
            console.log(`Unable to connect to database with ${url} because ${ex.message}`);
            process.exit(1);
        });
    
    // let users = [];
    // let scores = [];
    
    const port = process.argv.length > 2 ? process.argv[2] : 4000;
    app.use(express.static('public'));
    
    app.use(express.json());
    
    
    var apiRouter = express.Router();
    app.use(`/api`, apiRouter);
    
    apiRouter.post('/auth/create', async (req, res) => {
        const nameQuery = await users.find({name: req.body.name}).toArray()
        const emailQuery = await users.find({email: req.body.email}).toArray()
        if (nameQuery.length != 0) {
            res.status(409).send({ msg: "Username already in use" })
        } else if (emailQuery.length != 0) {
            res.status(409).send({ msg: "Account with that email already exists" })
        }
        await users.insertOne(req.body)
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
}

main.catch(console.error)

