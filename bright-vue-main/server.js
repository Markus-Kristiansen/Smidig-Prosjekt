const express = require('express');
const fs = require('fs');
const { MongoClient } = require("mongodb");


const handleUser = require('./server/routes/user');
const handleRepair = require('./server/routes/repair');
const handleCamp = require('./server/routes/camp');
const handleLogin = require('./server/routes/login').router;

const app = express();
const PORT = process.env.PORT || 8080;


// Middleware for logging
app.use('/', function (req, res, next) {
    const time = new Date()
    console.log(`Req: ${time.getUTCHours()}:${time.getUTCMinutes()}:${time.getUTCSeconds()}.${time.getUTCMilliseconds()} -> \t${req.url}`);
    next();
});


// API-routes
app.use('/user', handleUser);
app.use('/repair', handleRepair);
app.use('/camp', handleCamp);
app.use('/login', handleLogin);


// Serve static resources
app.use('/', express.static('./vue/dist'));


// Fix vue-refresh-bug
app.use(function (req, res) {
    res.send(fs.readFileSync('./vue/dist/index.html').toString())
})


MongoClient.connect("mongodb+srv://user:PdohYfoJ7o0PfQ8o@cluster0.eazu1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        promiseLibrary: Promise,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, db) => {
        if (err) { console.warn(`Failed to connect to the database. ${err.stack}`); }
        else {

            // Save instance of db-connection
            app.locals.db = db.db("boss");

            // Start the server
            app.listen(PORT, () => {
                console.log(`Server is live and listening to port ${PORT} :)`);
            });
        }
    }
);
