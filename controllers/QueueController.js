const mongoose = require('mongoose');
const databaseConfig = require('../config/database.js');
mongoose.connect(databaseConfig.mongourl);
const Page = require('../models/pages');

module.exports = {
    /**
     * Add new fanpage
     * @param  {object} pageFields Object that contains information about fanpage 
     * @param  {number} reportID ID of relative report
     * @return {promise}
     */
    addPage: function (pageFields, reportID) {
        return new Promise((resolve,reject) => {
            let newPageObj = {
                createDate: (new Date()),
                reportID: reportID,
                pageID: pageFields.pageID,
                name: pageFields.name,
                category: pageFields.category,
                cover: pageFields.cover,
                description: pageFields.description,
                website: pageFields.website,
                fanCount: Number.parseInt(pageFields.fanCount),
                talkingAbout: Number.parseInt(pageFields.talkingAbout),
                checking: Number.parseInt(pageFields.checkins)
            };
            Page.create(newPageObj).then(page => {
                resolve(page);
            }).catch(err => {
                reject(err);
            });
        });
    }
};
