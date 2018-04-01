const request = require('request');
const { URL, URLSearchParams } = require('url');

/**
 * This contoroller manage all requests to facebook graphs
 */
class GraphController {
    /**
     * Constructor
     * @param {string} accessToken An access token valid for specific type of requests
     */
    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    /**
     * Get data from fb endpoint
     * @param  {string} url Valid REST url of endpoint
     * @return {string} bodyResponse String content of response in JSON
     */
    retrieve(url) {
        var graphURL = new URL(url);
        graphURL.searchParams.append('access_token', this.accessToken);
        return new Promise((resolve, reject) => {
            request.get(graphURL.href, (err, res, body) => {
                if ( err ) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        });
    }
}

module.exports = GraphController;
