const request = require('request');
const { URL, URLSearchParams } = require('url');
const reports = require('./ReportsController');

/**
 * This contoroller manage all requests to facebook graphs
 */
module.exports = {
    /**
     * Get data from fb endpoint
     * @param  {string} url Valid REST url of endpoint
     * @return {string} bodyResponse String content of response in JSON
     */
    retrieve(url, accessToken) {
        let graphURL = new URL(url);
        graphURL.searchParams.append('access_token', accessToken);
        return new Promise((resolve, reject) => {
            request.get(graphURL.href, (err, res, body) => {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        });
    },

    /**
     * Get list of unfinished reports and search for fanpages
     */
    cron: function () {
        console.log('Checking for unfinished reports...');

        reports.getQueue().then(reports => {
            console.log(reports);
            // mark report as WIP true
            // search for fanpages
            // add fanpages into db
            // mark report as finished
        }).catch(err => {
            console.log(err);
        });
    }
};
