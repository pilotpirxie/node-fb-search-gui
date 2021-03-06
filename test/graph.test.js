require('dotenv').config({path: '.env'});
const chai = require('chai');
const assert = chai.assert;
const graph = require('../controllers/GraphController');

describe('Graph', function() {
    it('request to graph', async () => {
        return graph.retrieve('https://graph.facebook.com/v2.9/1085903488198718/insights/page_impressions/day', process.env.FB_ACCESS_TOKEN).then(body => {
          assert.typeOf(body, 'string');
          console.log(JSON.parse(body));
      }).catch(err => {
          assert.fail(err);
      });
    });
});
