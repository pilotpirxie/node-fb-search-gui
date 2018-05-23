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
                workInProgress: false,
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
     * @param  {string} userID User ID
     * @return {array} Reports
     */
    getAll: function (userID) {
        return new Promise((resolve, reject) => {
            Report.find({userID: userID}).then(reports => {
                var _reports = [];
                for(let report of reports) {
                    let _temp = {
                        id: report._id,
                        createDate: report.createDate.toLocaleString(),
                        keywords: report.keywords.split(','),
                        params: {
                            range: report.params.range,
                            lon: report.params.lon,
                            lat: report.params.lat
                        },
                        status: report.status
                    };
                    _reports.push(_temp);
                }
                resolve(_reports.reverse());
            }).catch(err => {
                reject(err);
            });
        });
    },

    /**
     * Get one specific report
     * @param {string} reportID ID of report to find
     * @param  {number} userID User ID
     * @return {object} Report
     */
    getSingle: function(reportID, userID) {
        return new Promise((resolve, reject) => {
            Report.findOne({userID: userID, _id: reportID}).then(report => {
                report.keywordsArray = report.keywords.split(',');
                report.viewDate = report.createDate.toLocaleString();
                resolve(report);
            }).catch(err => {
                reject(err);
            });
        });
    },

    /**
     * Get unfinished report
     * @return {object} Report
     */
    getQueue: function(report) {
        return new Promise((resolve, reject) => {
            Report.find({status: false}, null, {limit: 3}).sort('createDate').then(reports => {
                resolve(reports);
            }).catch(err => {
                reject(err);
            });
        });
    },

    setStatus: function (reportID, finished) {
        return new Promise ((resolve, reject) => {
            Report.update({_id: reportID}, {status: finished}).then(report => {
                resolve(report);
            }).catch(err => {
                reject(err);
            });
        });
    }

};
