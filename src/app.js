'use strict';

const CONFIG = require('../config');

let express = require('express');
let morgan = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let session = require('express-session');
let compression = require('compression');

let app = express();

let request = require('request');
let cheerio = require('cheerio');
let querystring = require('querystring');

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

app.get('/', (req, res) => {
	console.log(req.session.oauth);
	res.render('index', {
		oauth: req.session.oauth
	});
});

app.post('/i', (req, res) => {
	console.log(req.body.url);
	res.redirect(`/i/${req.body.url.split('/').pop()}`);
});
	
app.get('/i/:id', (req, res) => {
	request(`https:\/\/twitter.com/quote_helper\/status\/${req.params.id}`, (err, response, html) => {
		if(err) {
			res.json(err);
		}
		else {
			let $ = cheerio.load(html);
			
			let title = $('meta[property="og:title"]').attr('content');
			if(title) {
				title = title.split(' ');
				title.pop();
				title.pop();
				title = title.join(' ');
				let description = $('meta[property="og:description"]').attr('content');
				let image = $('.js-action-profile-avatar').attr('src');
				image = image.split('.');
				let extension = image.pop();
				image = image.join('.').split('_');
				image.pop();
				image = `${image.join('_')}.${extension}`;
				image = querystring.escape(image);
				
				res.render('card', {
					id: req.params.id,
					title: title,
					description: description,
					image: `https://quote.sapphire.sh/image/${image}`
				});
			}
			else {
				res.redirect('/');
			}
		}
	});
});

app.get('/image/:url', (req, res) => {
console.log(querystring.unescape(req.params.url));
	request.get(querystring.unescape(req.params.url)).pipe(res);
});

app.listen(8022);

