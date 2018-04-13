const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const authSettings = require('../config/auth');
const userController = require('../controllers/UsersController');

// facebook strategy settings
passport.use(new FacebookStrategy({
    clientID: authSettings.facebookAuth.appID,
    clientSecret: authSettings.facebookAuth.appSecret,
    callbackURL: authSettings.facebookAuth.callbackURL,
    profileFields: authSettings.facebookAuth.profileFields,
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, cb) {
      // console.log(profile._raw);
      req.session.profile = profile._raw;
      process.nextTick(function () {
        return cb(null, profile);
      });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

router.use(passport.initialize());
router.use(passport.session());

// check authentication
function isLogged(req, res, next) {
  if (req.session.profile) {
      return next();
  }
  res.redirect('login');
}

// fb callback
router.get('/facebook/callback', passport.authenticate('facebook', { session: true, failureRedirect: '/' }), function (req, res) {
    res.redirect('/');
});

// sign in button
router.get('/facebook', passport.authenticate('facebook'));

// sign in page
router.get('/', (req, res) => {
    if ( req.session.profile ) {
        res.redirect('/');
    } else {
        res.render('login');
    }
});

module.exports = router;
