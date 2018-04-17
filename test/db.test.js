const chai = require('chai');
const assert = chai.assert;
const mongoose = require('mongoose');
const databaseConfig = require('../config/database.js');
mongoose.connect(databaseConfig.mongourl);
const User = require('../models/users');
const Report = require('../models/reports');
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
            console.log(err);
        });
      });
});

describe('Report', function() {
    it('Add new report', () => {
        Report.create({
            createDate: (new Date()),
            keywords: 'test,keywords',
            range: '3',
            coordinates: '52.295042284537345;-6.328125',
            params: []
        }).then(report => {
            console.log(report);
            assert.typeOf(report, 'object');
        }).catch(err => {
            console.log(err);
        });
      });
});

describe('Page', function() {
    it('Add new page', () => {
        Page.create({
            createDate: (new Date()),
            reportID: '3453245345345-3245-3-45',
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
            console.log(err);
        });
      });
});
