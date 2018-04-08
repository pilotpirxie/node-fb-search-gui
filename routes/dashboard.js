const express = require('express');
const router = express.Router();

// check authentication
function isLogged(req, res, next) {
  if (req.session.profile) {
      return next();
  }
  res.redirect('/../login');
}

// sign in page
router.get('/', isLogged, (req, res) => {
    res.render('index');
});

router.get('/*', isLogged, (req, res) => {
    res.redirect('/');
});


module.exports = router;
