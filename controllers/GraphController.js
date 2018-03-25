const request = require('request');

class GraphController {
    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    retrieve(url) {
        return new Promise((resolve, reject) => {
            request.get(url + `?access_token=${this.accessToken}`, (err, res, body) => {
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
