const chai = require('chai');
const assert = chai.assert;
const mongoose = require('mongoose');
const databaseConfig = require('../config/database.js');
mongoose.connect(databaseConfig.mongourl);
const User = require('../models/users');

describe('User', function() {
    it('Add new user', () => {
        User.create({
            socialID: '123123123123',
            name: 'John Doe',
            email: 'john@doe.com'
        }).then(user => {
            console.log(user);
        });
      });
});
