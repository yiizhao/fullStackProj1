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
        callbackURL: '/auth/google/callback',
        proxy: true
    }, 
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id}) //a promise
            
        if (existingUser) {
            // we already have a record
            return done(null, existingUser); //tell mongo we are done, error message
        } 

        // we don't have the record, create  new one
        const user = await new User({  googleId: profile.id}).save() //need to be saved in the db, call.save
        done(null, user); //callback, the same instance but use the second one
        
        
    })
);