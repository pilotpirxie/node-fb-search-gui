const express = require('express');
const router = express.Router();

// check authentication
function isLogged(req, res, next) {
  if (req.session.profile) {
      return next();
  }
  res.redirect('/../login');
}

// home
router.get('/', isLogged, (req, res) => {
    res.render('index');
});

// history
router.get('/history', isLogged, (req, res) => {
    res.render('history');
});

// settings
router.get('/settings', isLogged, (req, res) => {
    res.render('settings');
});

// upgrade
router.get('/upgrade', isLogged, (req, res) => {
    res.render('upgrade');
});

// invoices
router.get('/invoices', isLogged, (req, res) => {
    res.render('invoices');
});

// help
router.get('/help', isLogged, (req, res) => {
    res.render('help');
});

// logout
router.get('/logout', (req, res) => {
  res.redirect('/../logout');
});

router.get('/*', isLogged, (req, res) => {
    res.redirect('/');
});


module.exports = router;
