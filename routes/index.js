const express = require('express');
const router = express.Router();

// check authentication
function isLogged(req, res, next) {
  if (req.session.profile) {
      return next();
  }
  res.redirect('login');
}

// sign in page
router.get('/', isLogged, (req, res) => {
    res.redirect('/dashboard/');
});

// sign in page
router.get('/login/', (req, res) => {
    res.redirect('auth');
});

// logout
router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('login');
});

module.exports = router;
