'use strict';

const CONFIG = require('../config');

let express = require('express');
let morgan = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let compression = require('compression');

let app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(session({
	secret: CONFIG.session.secret,
	resave: false,
	saveUninitialized: true
}));
app.use(compression());

app.set('view engine', 'ejs');
app.use('/static', express.static('../public'));
app.use('/', require('./router'));

app.listen(8022);

