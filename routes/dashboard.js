const express = require('express');
const router = express.Router();
const report = require('../controllers/ReportsController');
const user = require('../controllers/UsersController');

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
    user.get({_id: req.session.profile._id}).then(userFound => {
        console.log(userFound);
        userFound = userFound[0];
        res.render('settings', {invoiceInformation: userFound.invoiceInformation, contactName: userFound.name, newsletter: userFound.newsletter});
    }).catch(err => {
        console.log(err);
        res.render('settings');
    });
});

router.post('/settings/change', isLogged, (req, res) => {
    let newFields = {
        name: req.body.contactName,
        newsletter: req.body.newsletter && req.body.newsletter.length > 0,
        invoiceInformation: req.body.invoiceInformation
    }
    user.change({_id: req.session.profile._id}, newFields).then(user => {
        console.log('User updated!', user);
        res.redirect('/dashboard/settings?info=success');
    }).catch(err => {
        console.log(err);
        res.redirect('/dashboard/settings?info=error');
    })

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
router.post('/worker/add', isLogged, (req, res) => {
    report.add(req.body, req.session.profile._id).then((report) => {
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
