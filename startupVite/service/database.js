const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('econSim');
const users = db.collection("users");
const scores = db.collection("scores");

(async function testConnection() {
        await client.connect();
        await db.command({ ping: 1 });
    })().catch((ex) => {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    });

function getUserByEmail(email) {
    return users.findOne({ email: email });
}

function getUserByName(name) {
    return users.findOne({ name: name });
}
    
function getUserByToken(token) {
    return users.findOne({ token: token });
}

async function createUser(name, email, password) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);
  
    const user = {
        name: name,
        email: email,
        business: null,
        password: passwordHash,
        token: uuid.v4(),
    };
    await users.insertOne(user);
    
    return user;
}

async function addScore(score) {
    return scores.insertOne(score);
}
  
function getHighScores() {
    const query = { score: { $gt: 0, $lt: 900 } };
    const options = {
        sort: { score: -1 },
        limit: 10,
    };
    const cursor = scores.find(query, options);
    return cursor.toArray();
}
  
module.exports = {
    getUserByEmail,
    getUserByName,
    getUserByToken,
    createUser,
    addScore,
    getHighScores,
};