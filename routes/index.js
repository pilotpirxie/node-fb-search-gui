const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const authSettings = require('../config/auth.js');

// facebook strategy settings
passport.use(new FacebookStrategy({
    clientID: authSettings.facebookAuth.appID,
    clientSecret: authSettings.facebookAuth.appSecret,
    callbackURL: authSettings.facebookAuth.callbackURL,
    profileFields: authSettings.facebookAuth.profileFields
  },
  function(accessToken, refreshToken, profile, callback) {
      // console.log(profile._raw);
      callback();
  }
));

// check authentication
function authenticate (req, res, next) {
    if ( typeof req.session.userID != 'undefined' && req.session.userID ) {
        next();
    } else {
        res.redirect('login');
    }
}

// home page
router.get('/', authenticate, (req, res) => {
    res.render('index');
});

// fb callback
router.get('/auth/facebook/callback', passport.authenticate('facebook', { session: true, successRedirect: '/', failureRedirect: '/' }), function (req, res) {
    res.redirect('/');
});

// sign in button
router.get('/auth/facebook', passport.authenticate('facebook', function (err, user, info) {
    console.log(user);
}));

// sign in page
router.get('/login/', (req, res) => {
    res.render('login');
});

module.exports = router;
