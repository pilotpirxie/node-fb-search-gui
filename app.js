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

// server
const server = https.createServer(expressOptions, app).listen(app.get('port'), function(){
    console.log(`App is listening on port ${server.address().port}!`);
});
