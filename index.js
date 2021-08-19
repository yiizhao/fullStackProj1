
//only common js modules supported, Node not support ES 2015
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User'); //execute  mongoose，register first
require('./services/passport'); //we only make sure the file is executed


mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

const app = express(); // generate a running Express app, set up configuration, route requests

//middleware for all routes
app.use(express.json()); // fix bug
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //expiration period
        keys: [keys.cookieKey]
    })
);

//ask passport to use cookie
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//only run in production
if (process.env.NODE_ENV == 'production') {//heroku set it
    //the order of these two decide it will fetch html or js etc

    // Express will serve up production assets
    // like our main.js file or main.css file
    app.use(express.static('client/build'))

    // Express will serve up the index.html if it
    //doesn't know the roule
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(_dirname,'client', 'build', 'index.html' ));
    });
}

const PORT  = process.env.PORT || 5000; //heroku gives or the default port
//Express tell Node to listen to port
app.listen(PORT);