const passport =  require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');  //go out of the directory

const User = mongoose.model('users'); //collection

passport.serializeUser((user, done) => { // user is line 27 user
    done(null, user.id); //user.id is not profile.id, it's mongo id. may have multiple auth providers
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, 
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id}) //a promise
            .then((existingUser) => {
                if (existingUser) {
                    // we already have a record
                    done(null, existingUser); //tell mongo we are done, error message
                } else {
                    // we don't have the record, create  new one
                    new User({  googleId: profile.id}).save() //need to be saved in the db, call.save
                        .then(user => done(null, user)); //callback, the same instance but use the second one
                }
            })
        
    })
);