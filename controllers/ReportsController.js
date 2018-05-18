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
            let _keywords = reportFields.keywords.split(',');
            _keywords = _keywords.filter(n => n.length > 2);

            let newReportsObj = {
                createDate: (new Date()),
                userID: userID,
                keywords: _keywords.join(','),
                params: {
                    range: reportFields.range,
                    lon: reportFields.coordinates.split(';')[0],
                    lat: reportFields.coordinates.split(';')[1]
                },
                status: false,
                quotaLimit: 25
            };
            Report.create(newReportsObj).then(report => {
                resolve(report);
            }).catch(err => {
                reject(err);
            });
        });
    },

    /**
     * Get all reports for specific user
     * @param  {number} uID User ID
     * @return {array} Reports
     */
    getAll: function (userID) {
        return new Promise((resolve, reject) => {
            Report.find({userID: userID}).then(reports => {
                resolve(reports.reverse());
            }).catch(err => {
                reject(err);
            });
        });
    }
};
