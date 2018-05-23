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
            shortAccessToken: accessToken
        };
        User.create(userFields).then(user => {
            callback(user);
        });
    },

    /**
     * Search for user in database and return count of occurencies
     * @param  {object} userFields Fields to search user(s), e.g. ID or socialID
     * @param  {function} callback Callback
     * @return {number} Length of returned array
     */
    count: function (userFields, callback) {
        User.find(userFields, (err, users) => {
            callback(users.length, users);
        });
    },

    /**
     * Get user fields from db
     * @param  {object} userFields Some old fields in db to match user(s)
     * @return {promise}
     */
    get: function (userFields) {
        return new Promise ((resolve, reject) => {
            User.find(userFields).then(users => {
                resolve(users);
            }).catch(err => {
                reject(err);
            });
        });
    },

    /**
     * Change user fields in db
     * @param  {object} userFields Some old fields in db to match user(s)
     * @param  {object} newFields New fields in db
     * @return {promise}
     */
    change: function (userFields, newFields) {
        return new Promise ((resolve, reject) => {
            User.findByIdAndUpdate(userFields, newFields).then(user => {
                resolve(user);
            }).catch(err => {
                reject(err);
            });
        });
    }
};
