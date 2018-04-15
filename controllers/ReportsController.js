const mongoose = require('mongoose');
const databaseConfig = require('../config/database.js');
mongoose.connect(databaseConfig.mongourl);
const Report = require('../models/reports');

module.exports = {
    add: function (reportFields) {
        return new Promise((resolve,reject) => {
            console.log(reportFields);
            resolve({test:'test'});
        });
    }
};
