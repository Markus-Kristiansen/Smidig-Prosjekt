const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectId; 


// GET      - /user/:userId             - spesific user: alias, lastLogin, accessLevel
router.get('/:userId', async function (req, res) {
    //TODO: Token + access validation
    const userId = req.params.userId;
    const collection = req.app.locals.db.collection('users');
    const data = await collection.findOne({ _id: ObjectId(userId) }, {projection: { password: 0}});
    res.status(200).send(data);
})

router.put('/:userId', async function (req, res) {
    const userId = req.params.userId;
    const newPassword = req.headers.password;
    const collection = req.app.locals.db.collection('users');
    const user = await collection.findOne({ _id: ObjectId(userId) });

    user.password = newPassword;

    await collection.replaceOne({ _id: ObjectId(userId) }, user);
    res.sendStatus(200)
})

module.exports = router