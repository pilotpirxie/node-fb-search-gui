const chai = require('chai');
const assert = chai.assert;
const mongoose = require('mongoose');
const databaseConfig = require('../config/database.js');
mongoose.connect(databaseConfig.mongourl);
const User = require('../models/users');
const Report = require('../models/reports');
const Invoice = require('../models/invoices');
const Page = require('../models/pages');

describe('User', function() {
    it('Add new user', () => {
        User.create({
            createDate: (new Date()),
            socialID: '1234',
            name: 'John',
            email: 'test@asd.asd',
            shortAccessToken: 'asdasd',
        }).then(user => {
            console.log(user);
            assert.typeOf(user, 'object');
        }).catch(err => {
            assert.fail(err, `Something goes wrong ${err}`);
        });
      });
});

describe('Report', function() {
    it('Add new report', () => {
        Report.create({
            userID: '901230192301923-123123-123',
            createDate: (new Date()),
            keywords: 'test,keywords',
            range: '3',
            status: false,
            params: {
                range: '25',
                lon: 52.295042284537345,
                lat: -6.328125
            },
            quotaLimit: 25
        }).then(report => {
            console.log(report);
            assert.typeOf(report, 'object');
        }).catch(err => {
            assert.fail(err, `Something goes wrong ${err}`);
        });
      });
});

describe('Invoice', function() {
    it('Add new invoice', () => {
        Invoice.create({
            createDate: (new Date()),
            userID: '5ad666cab2ef432c24827b72',
            downloadURL: 'https://',
            amount: '32 ',
            paymentID: '123128312-3-123-123',
            paymentStatus: false
        }).then(invoice => {
            console.log(invoice);
            assert.typeOf(invoice, 'object');
        }).catch(err => {
            assert.fail(err, `Something goes wrong ${err}`);
        });
      });
});

describe('Page', function() {
    it('Add new page', () => {
        Page.create({
            createDate: (new Date()),
            reportID: '5aff4bff78e1461f60a30179',
            pageID: '12312312391231-312-3-123-1-23',
            name: 'Test Restaurant',
            category: 'Food',
            cover: 'https://example.com/img/test.jpg',
            description: 'Lorem ipsum dolor sit amet.',
            website: 'https://example.com',
            fanCount: Number.parseInt('43'),
            talkingAbout: Number.parseInt('41'),
            checking: Number.parseInt('12551')
        }).then(page => {
            console.log(page);
            assert.typeOf(page, 'object');
        }).catch(err => {
            assert.fail(err, `Something goes wrong ${err}`);
        });
      });
});
