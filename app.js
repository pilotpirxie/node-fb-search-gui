require('dotenv').config({path: '.env'});
const https = require('https');
const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const expressOptions = require('./config/ssl');
const cookieSession = require('cookie-session');
const graph = require('./controllers/GraphController');

// handlebars settings
const hbs = exphbs.create({
    helpers: {},
    extname: '.hbs',
    partialsDir: ['views/partials/']
});

// settings
app.engine('hbs', hbs.engine);
app.set('port', process.env.PORT || process.env.DEFAULT_PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET],
  maxAge: 24 * 60 * 60 * 1000,
  secure: true
}));

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(flash());

// routing
app.use('/', require('./routes/index.js'));
app.use('/dashboard/', require('./routes/dashboard.js'));
app.use('/auth/', require('./routes/login.js'));

// error handling
app.use('*', (req, res) => {
    res.status(404).send('404 - Not found');
});
app.use(function (err, req, res, next) {
    if ( err ) {
        console.error(err.stack);
        res.status(500).send('500 - Oh no! Something broke! Contact us at contact@leadmaker.online');
    }
});

const cronJob = require('cron').CronJob;

new cronJob('*/5 * * * * *', graph.cron(), null, true, 'America/Los_Angeles');

// server
const server = https.createServer(expressOptions, app).listen(app.get('port'), function(){
    console.log(`App is listening on port ${server.address().port}!`);
});
