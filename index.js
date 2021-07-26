
//only common js modules supported, Node not support ES 2015
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User'); //execute  mongoose，register first
require('./services/passport'); //we only make sure the file is executed

mongoose.connect(keys.mongoURI);

const app = express(); // generate a running Express app, set up configuration, route requests

//middleware
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

const PORT  = process.env.PORT || 5000; //heroku gives or the default port
//Express tell Node to listen to port
app.listen(PORT);