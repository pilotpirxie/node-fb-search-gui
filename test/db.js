const chai = require('chai');
const assert = chai.assert;
const mongoose = require('mongoose');
const databaseConfig = require('../config/database.js');
mongoose.connect(databaseConfig.mongourl);
const User = require('../models/users');

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
        });
      });
});
