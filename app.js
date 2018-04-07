require('dotenv').config({path: '.env'});
const https = require('https');
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const fs = require('fs');

// settings
app.engine('hbs', hbs({extname: '.hbs'}));
app.set('port', process.env.PORT || process.env.DEFAULT_PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
const expressOptions = {
    key: fs.readFileSync(path.join(__dirname, 'config', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'config', 'server.crt')),
    requestCert: false,
    rejectUnauthorized: false
};

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(flash());

// routing
app.use('/', require('./routes/index.js'));

// server
const server = https.createServer(expressOptions, app).listen(app.get('port'), function(){
    console.log(`App is listening on port ${server.address().port}!`);
});
