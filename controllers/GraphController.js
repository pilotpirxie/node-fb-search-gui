const request = require('request');
const { URL, URLSearchParams } = require('url');
const reports = require('./ReportsController');
const users = require('./UsersController');
const pages = require('./PagesController');

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
        console.log(graphURL.href);
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

        reports.getQueue().then(_reports => {
            for ( let _report of _reports ) {
                reports.setStatus(_report._id, true).then( () =>{
                    console.log('Report marked as finished');
                }).catch( err => {
                    console.log(err);
                });

                // distance shuld be in km
                let _distance = _report.params.range * 1000;

                // get user associated with report
                users.get({_id: _report.userID}).then(user => {

                    // retrieve information from graph facebook
                    // about fanpages and places
                    this.retrieve(`https://graph.facebook.com/v3.0/search?type=place&q=cafe&center=${_report.params.lon},${_report.params.lat}&distance=${_distance}&fields=category_list,name,about,cover,fan_count,description,link,checkins,picture`, user[0].shortAccessToken).then(data => {

                        // check if returned data is correct
                        let _parsedResponse = JSON.parse(data);
                        if ( _parsedResponse.hasOwnProperty('data') ){

                            // get all pages from current response
                            for ( let place of _parsedResponse.data ) {
                                console.log('-------------');
                                console.log(place);
                                pages.addPage({
                                    pageID: 'undefined',
                                    name: place.name,
                                    category: place.category_list[0].name,
                                    cover: place.cover.source,
                                    description: place.description,
                                    website: place.link,
                                    fanCount: 0,
                                    talkingAbout: 0,
                                    checking: place.checkins
                                }, _report.id).then(()=>{
                                    console.log('Inserted new page for report', _report.id);
                                }).catch(err => {
                                    console.log(err);
                                });
                            }

                            if ( _parsedResponse.hasOwnProperty('paging') ) {
                                // next page exist
                            } else {
                                // next page not exist
                            }
                        } else {
                            console.log('Failed to fetch information', _report.id);
                        }
                    });
                }).catch(err => {
                    console.log('error', err);
                })
            }

            // mark report as WIP true
            // search for fanpages
            // add fanpages into db
            // mark report as finished
        }).catch(err => {
            console.log(err);
        });
    }
};
