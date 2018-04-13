const User = require('../models/users');

module.exports = {
    /**
     * Create new user in database
     * @param  {object} userFields Field with user information
     * @param  {function} callback Function to call after successfully registered
     * @return {object} User object
     */
    register: function (userFields, cb) {
        User.create(userFields, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                cb(user);
            }

        });
    }
};
