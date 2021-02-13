// requiring passport.js library for oauth
const passport = require('passport');
// google specific library for using google oauth
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// private env vars
const keys = require('../config/keys');
// mongoose.js ORM for mapping google login info to our mongoDB
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    });
});

// first argument of GoogleStrategy Constructor, google config object
const googleConfig = {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
};

// second argument of GoogleStrategyConstructor, callback function with preset args
const googleCallback = (accessToken, refreshToken, profile, done) => {

    User.findOne({ googleId: profile.id })
    .then((existingUser) => {
        if (existingUser){
            // if we already have a record of this user with this googleId;
            done(null, existingUser);
        } else {
            // we don't have a user with this googleId; 
            new User({ googleId: profile.id }).save()
            .then(user => {
                done(null, user);
            });
        }
    });

   
};

// instruct passport to use these credentials when invoked with 'google';
passport.use(new GoogleStrategy(googleConfig, googleCallback));