const mongoose = require('mongoose');
const databaseConfig = require('../config/database.js');
mongoose.connect(databaseConfig.mongourl);
const Report = require('../models/reports');

module.exports = {
    /**
     * Create new report
     * @param  {req.body} reportFields Data from form inputs
     * @param  {number} userID ID of relative user
     * @return {object} report Object of report inserted into db or error
     */
    add: function (reportFields, userID) {
        return new Promise((resolve,reject) => {
            let newReportsObj = {
                createDate: (new Date()),
                userID: userID,
                keywords: reportFields.keywords,
                coordinates: reportFields.coordinates,
                params: {range: reportFields.range},
                quotaLimit: 25
            };
            Report.create(newReportsObj).then(report => {
                resolve(report);
            }).catch(err => {
                reject(err);
            });
        });
    }
};
