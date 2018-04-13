const mongoose = require('mongoose');
const databaseConfig = require('../config/database.js');
mongoose.connect(databaseConfig.mongourl);
const User = require('../models/users');

module.exports = {
    /**
     * Create new user in database
     * @param  {object} socialFields Field with user information
     * @param  {function} callback Function to call after successfully registered
     * @return {object} User object
     */
    register: function (socialFields, accessToken, callback) {
        socialFields = JSON.parse(socialFields);
        let userFields = {
            createDate: (new Date()),
            socialID: '' + socialFields.id,
            name: socialFields.first_name + ' ' + socialFields.last_name,
            email: socialFields.email,
            shortAccessToken: accessToken,
        };
        User.create(userFields).then(user => {
            console.log(user);
            callback(user);
        });
    },

    /**
     * Search for user in database and return count of occurencies
     * @param  {object} userFields Fields to search user(s), e.g. ID or socialID 
     * @param  {function} callback Callback
     * @return {number} Length of returned array
     */
    exist: function (userFields, callback) {
        User.find(userFields, (err, users) => {
            callback(users.length, users);
        });
    }
};
