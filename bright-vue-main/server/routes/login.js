const express = require("express");
const router = express.Router();
const md5 = require("md5");

//console.log(md5("123"));

let sessions = [];

async function authenticate(req, required_access) {
  const token_timestamp_threshold = 1800000; // 30 min
  const collectionUsers = req.app.locals.db.collection("users");
  const users = await collectionUsers.find().toArray();

  for (const session of sessions) {

    console.log(`Checking session: '${session.token}' -> '${req.headers.token}' = ${session.token == req.headers.token}`)

    if (
      session.token == req.headers.token &&
      Date.now() - session.timestamp < token_timestamp_threshold
    ) {
      for (const user of users) {
        console.log(`Check user '${user.alias}' -> ID: ${user._id.toString()} == ${session.userId} = ${user._id == session.userId} Time: ${user.accessLevel >= required_access}`)
        
        
        if (user._id == session.userId && user.accessLevel >= required_access) {
          return {valid: true, userId: user._id};
        }
      }
    }
  }
  return {valid: false}
}

router.get("/sessions", function (req, res) {
  console.log(sessions);
  res.send(200);
});

router.get("/", async function (req, res) {
  const collectionUsers = req.app.locals.db.collection("users");
  const users = await collectionUsers.find().toArray();

  for (const user of users) {
    if (
      req.headers.username == user.username &&
      req.headers.password == user.password
    ) {
      sessions = sessions.filter(
        (session) => session.username != user.username
      );

      session = {
        userId: user._id,
        username: user.username,
        timestamp: Date.now(),
        token: md5(`${req.headers.username}:${Math.random()}`),
      };

      sessions.push(session);
      //console.log("User logged in:");
      //console.log(user);
      res.status(200).send({
        token: session.token,
        access: user.accessLevel,
        campId: user.campId,
        alias: user.alias,
      });
      return;
    }
  }

  res.status(401).send("Bad login");
});

module.exports = { router, authenticate };
