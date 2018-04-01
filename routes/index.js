const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const authSettings = require('../config/auth.js');

passport.use(new FacebookStrategy({
    clientID: authSettings.facebookAuth.appID,
    clientSecret: authSettings.facebookAuth.appSecret,
    callbackURL: authSettings.facebookAuth.callbackURL,
    profileFields: authSettings.facebookAuth.profileFields

  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(accessToken, refreshToken, profile);
  }
));

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/auth/facebook/callback', (req, res) => {
    res.redirect('/');
});

router.get('/login', passport.authorize('facebook'));

module.exports = router;
