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
    res.render('index');
});

// sign in page
router.get('/login/', (req, res) => {
    res.redirect('auth');
});

module.exports = router;
