const mongoose = require('mongoose');
const databaseConfig = require('../config/database.js');
mongoose.connect(databaseConfig.mongourl);
const Page = require('../models/pages');

// async for each loop
// https://gist.github.com/Atinux/fd2bcce63e44a7d3addddc166ce93fb2
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

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
    },

    /**
     * Get all pages for specific report
     * @param  {number} reportID ID of report
     * @return {array}          Pages that match
     */
    getAll: function(reportID) {
        return new Promise((resolve, reject) => {
            Page.find({reportID: reportID}).then(pages => {
                resolve(pages);
            }).catch(err => {
                reject(err);
            });
        });
    },

    /**
     * Get number of matching pages for specific report
     * @param  {number} reportID ID of report
     * @return {array}          Count number that match
     */
    count: function(reports) {
        return new Promise((resolve, reject) => {
            const start = async () => {
                let fpCount = 0;
                let fpKeywords = 0;
                await asyncForEach(reports, async report => {
                    let _keywords = report.keywords + '';
                    fpKeywords += _keywords.split(',').length;
                    await Page.count({reportID: report.id}).then(count => {
                        fpCount += count;
                    }).catch(err => {
                        reject(err);
                    });
                });
                resolve({countNumb: fpCount, keywordsNumb: fpKeywords});
            }
            start();
        });
    },
};
