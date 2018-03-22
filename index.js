const express = require('express');
const app = express();
const path = require('path');
const hbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// settings
app.engine('hbs', hbs({extname: '.hbs'}));
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(flash());

// routing
app.use('/', require('./routes/index.js'));

// server
const server = app.listen(app.get('port'), () => {
    console.log(`App is listening on port ${server.address().port}!`);
});
