const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const authenticate = require("./login").authenticate;

router.get("/all", async function (req, res) {
  console.log(await authenticate(req, 3));

  const collectionCamps = req.app.locals.db.collection("camps");
  const camps = await collectionCamps
    .find({}, { projection: { _id: 1, title: 1 } })
    .toArray();

  res.status(200).send(camps);
});

router.get("/:campId", async function (req, res) {

  console.log(await authenticate(req, 1))

  const collectionCamps = req.app.locals.db.collection("camps");
  const campId = req.params.campId;
  const camp = await collectionCamps.findOne({ _id: ObjectId(campId) });
  res.status(200).send(camp);
});

router.post("/:campId/repair", async function (req, res) {
  const auth = true;

  console.log(await authenticate(req, 1));

  if (auth) {
    const collectionCamps = req.app.locals.db.collection("camps");
    const collectionRepairs = req.app.locals.db.collection("repairs");

    const campId = req.params.campId;
    const user = req.headers.user;

    // Find camp
    const camp = await collectionCamps.findOne({ _id: ObjectId(campId) });

    const result = await collectionRepairs.insertOne({
      repair: JSON.parse(req.headers.repair),
      user,
      timestamp: Date.now(),
    });

    if (JSON.parse(req.headers.repair).led) {
      camp.parts.led--;
    }
    if (JSON.parse(req.headers.repair).solarArray) {
      camp.parts.solarArray--;
    }
    if (JSON.parse(req.headers.repair).button) {
      camp.parts.button--;
    }
    if (JSON.parse(req.headers.repair).battery) {
      camp.parts.battery--;
    }

    camp.repairs[result.insertedId] = user;

    await collectionCamps.replaceOne({ _id: ObjectId(campId) }, camp);

    console.log(
      `Added repair '${result.insertedId}' to camp '${campId}' by user '${user}'`
    );

    res.sendStatus(200);
  } else {
    res.status(403);
  }
});

router.delete("/:campId/user/:userId", async function (req, res) {
  const collectionCamps = req.app.locals.db.collection("camps");
  const collectionUsers = req.app.locals.db.collection("users");
  // Find camp
  const camp = await collectionCamps.findOne({
    _id: ObjectId(req.params.campId),
  });

  delete camp.users[req.params.userId];

  collectionUsers.deleteOne({ _id: ObjectId(req.params.userId) });

  await collectionCamps.replaceOne({ _id: ObjectId(req.params.campId) }, camp);
  res.sendStatus(200);
});

router.post("/:campId/user", async function (req, res) {
  const auth = true;

  if (auth) {
    const collectionCamps = req.app.locals.db.collection("camps");
    const collectionUsers = req.app.locals.db.collection("users");

    const campId = req.params.campId;

    // Find camp
    const camp = await collectionCamps.findOne({ _id: ObjectId(campId) });
    const users = await collectionUsers.find().toArray();

    for (const user of users) {
      if (user.username == req.headers.username) {
        res.sendStatus(403);
        return;
      }
    }

    // Create user
    const response = await collectionUsers.insertOne({
      username: req.headers.username,
      password: req.headers.password,
      alias: req.headers.alias,
      campId,
      accessLevel: req.headers.access,
      lastLogin: 0,
    });

    camp.users[response.insertedId] = "1";

    await collectionCamps.replaceOne({ _id: ObjectId(campId) }, camp);
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

router.get("/:campId/repair/all", async function (req, res) {
  const auth = true;

  if (auth) {
    const collectionCamps = req.app.locals.db.collection("camps");
    const collectionRepairs = req.app.locals.db.collection("repairs");
    const campId = req.params.campId;

    // Find camp
    const camp = await collectionCamps.findOne({ _id: ObjectId(campId) });
    const repairs = await collectionRepairs.find().toArray();

    //console.log(repairs);

    const campRepairs = [];

    for (const repair of repairs) {
      for (const campRepairId in camp.repairs) {
        ////console.log(`${campRepairId} - ${repair.id}`)
        if (repair._id == campRepairId) {
          campRepairs.push(repair);
        }
      }
    }
    res.status(200).send(campRepairs);
  } else {
    res.sendStatus(403);
  }
});

router.get("/:campId/user/all", async function (req, res) {
  const auth = true;

  if (auth) {
    const collectionCamps = req.app.locals.db.collection("camps");
    const collectionUsers = req.app.locals.db.collection("users");
    const campId = req.params.campId;

    // Find camp
    const camp = await collectionCamps.findOne({ _id: ObjectId(campId) });
    const users = await collectionUsers
      .find({}, { projection: { password: 0 } })
      .toArray();

    const campUsers = [];
    for (const user of users) {
      for (const campUserId in camp.users) {
        if (user._id == campUserId) {
          campUsers.push(user);
        }
      }
    }
    res.status(200).send(campUsers);
  } else {
    res.sendStatus(403);
  }
});

router.put("/:campId/parts", async function (req, res) {
  const collectionCamps = req.app.locals.db.collection("camps");
  const campId = req.params.campId;

  // Find camp
  const camp = await collectionCamps.findOne({ _id: ObjectId(campId) });

  camp.parts.sunbell = req.headers.sunbell
  camp.parts.led = req.headers.led
  camp.parts.solarArray = req.headers.solararray
  camp.parts.button = req.headers.button
  camp.parts.battery = req.headers.battery

  await collectionCamps.replaceOne({ _id: ObjectId(campId) }, camp);
  res.sendStatus(200);
});

module.exports = router;
