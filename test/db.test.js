const chai = require('chai');
const assert = chai.assert;
const mongoose = require('mongoose');
const databaseConfig = require('../config/database.js');
mongoose.connect(databaseConfig.mongourl);
const User = require('../models/users');
const Report = require('../models/reports');

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
