const express = require('express')
const router = express.Router()
const md5 = require('md5');



// GET      - /user/all                 - List of all users: id, alias
router.get('/all', async function (req, res) {
    //TODO: Token + access validation
    const collection = req.app.locals.db.collection(mongoCollection);
    const data = await collection.find().toArray();
    res.status(200).send(data);
})

// GET      - /user/:userId             - spesific user: alias, lastLogin, accessLevel
router.get('/:userId', async function (req, res) {
    //TODO: Token + access validation
    const userId = req.params.userId;
    const collection = req.app.locals.db.collection(mongoCollection);
    const data = await collection.findOne({ user: userId });
    res.status(200).send(data);
})

// POST     - /user                     - new user: alias, password //*Returns id?
router.post('/', async function (req, res) {
    //TODO: Token + access validation
    const collection = req.app.locals.db.collection(mongoCollection);

    await collection.insertOne({
        username: req.headers.username,
        password: req.headers.password,
        alias: req.headers.alias,
        accessLevel: 'user',
        lastLogin: 0
    });

    res.status(200);
})


// PUT      - /user/:userId             - update user: alias, accessLevel, password
router.put('/:userId', async function (req, res) {
    //TODO: Token + access validation
    const userId = req.params.userId;
    const collection = req.app.locals.db.collection(mongoCollection);

    await collection.updateOne({ user: userId }, {
        password: req.headers.password,
        alias: req.headers.alias,
        accessLevel: req.headers.accessLevel
    });
})

module.exports = router