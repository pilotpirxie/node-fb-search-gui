const express = require('express');
const router = express.Router();
const report = require('../controllers/ReportsController');

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

// new report
router.post('/worker/report', isLogged, (req, res) => {
    report.add(req.body).then((report) => {
        console.log(report);
        res.redirect('/dashboard/?info=success');
    }).catch((err) => {
        console.log(err);
        res.redirect('/dashboard/?info=error');
    });
});

router.get('/*', isLogged, (req, res) => {
    res.redirect('/');
});


module.exports = router;
