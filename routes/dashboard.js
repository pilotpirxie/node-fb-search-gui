const express = require('express');
const router = express.Router();
const report = require('../controllers/ReportsController');
const user = require('../controllers/UsersController');
const reports = require('../controllers/ReportsController');
const pages = require('../controllers/PagesController');

// check authentication
function isLogged(req, res, next) {
  if (req.session.profile) {
      return next();
  }
  res.redirect('/../login');
}

// home
router.get('/', isLogged, (req, res) => {
    // get reports and sum all fanpages
    reports.getAll(req.session.profile._id).then(reports => {
        pages.count(reports).then(pagesStats => {
            res.render('index', {reportsCount: reports.length, fanpagesCount: pagesStats.countNumb, keywordsCount: pagesStats.keywordsNumb});
        });
    }).catch(err => {
        console.log(err);
        res.redirect('/history/?info=reports-error');
    });
});

// history
router.get('/history', isLogged, (req, res) => {
    reports.getAll(req.session.profile._id).then(reports => {
        res.render('history', {reports: reports});
    }).catch(err => {
        console.log(err);
        res.redirect('/dashboard/?info=reports-error');
    });
});

// details of reports
router.get('/details/:reportID', isLogged, (req, res) => {
    reports.getSingle(req.params.reportID, req.session.profile._id).then(report => {
        pages.getAll(report._id).then(pages => {
            res.render('details', {report: report, pages: pages});
        });
    }).catch(err => {
        console.log(err);
        res.redirect('/dashboard/?info=details-error');
    })
});

// settings
router.get('/settings', isLogged, (req, res) => {
    user.get({_id: req.session.profile._id}).then(userFound => {
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

// help
router.get('/help', isLogged, (req, res) => {
    res.render('help');
});

// logout
router.get('/logout', (req, res) => {
  res.redirect('/../logout');
});

// new report
router.post('/report/add', isLogged, (req, res) => {
    if ( typeof req.body.coordinates === 'string' && req.body.coordinates.length > 0 ) {
        if (req.body.keywords.replace(/[^\w.-]/g, '').length > 2){
            report.add(req.body, req.session.profile._id).then((report) => {
                console.log(report);
                res.redirect('/dashboard/history/?info=added');
            }).catch((err) => {
                console.log(err);
                res.redirect('/dashboard/?info=error');
            });
        } else {
            res.redirect('/dashboard/?info=keywords-error');
        }
    } else {
        res.redirect('/dashboard/?info=missing-error');
    }
});

router.get('/*', isLogged, (req, res) => {
    res.redirect('/');
});


module.exports = router;
