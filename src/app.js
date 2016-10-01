'use strict';

let fs = require('fs');
let path = require('path');

let express = require('express');
let morgan = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let compression = require('compression');

let app = express();

let request = require('request');
let cheerio = require('cheerio');
let querystring = require('querystring');

let crypto = require('crypto');
const algorithm = 'aes-256-cbc-hmac-sha256';
const password = fs.readFileSync(path.join(__dirname, '..', 'config'));

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(compression());

app.set('view engine', 'ejs');
app.use('/static', express.static('static'));

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/i', (req, res) => {
	let id = req.body.url.split('/').pop();
	res.redirect(`/i/${encrypt(`${new Date().getTime()}-${id}`)}`);
});
	
app.get('/i/:id', (req, res) => {
	try {
		let id = decrypt(req.params.id).split('-').pop();
		request(`https:\/\/twitter.com/quote_helper\/status\/${id}`, (err, response, html) => {
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
					let image = $('.js-initial-focus .js-action-profile-avatar').attr('src');
					image = image.split('.');
					let extension = image.pop();
					image = image.join('.').split('_');
					image.pop();
					image = `${image.join('_')}.${extension}`;
					image = querystring.escape(image);
					
					res.render('card', {
						id: id,
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
	} catch(e) {
		res.status(400);
		res.end();
		console.log(typeof e);
	}
});

function encrypt(text) {
	let cipher = crypto.createCipher(algorithm, password);
	let enc = cipher.update(text, 'utf8', 'hex');
	enc += cipher.final('hex');
	return enc;
}

function decrypt(text) {
	let decipher = crypto.createDecipher(algorithm, password);
	let dec = decipher.update(text, 'hex', 'utf8')
	dec += decipher.final('utf8');
	return dec;
}

app.get('/image/:url', (req, res) => {
console.log(querystring.unescape(req.params.url));
	request.get(querystring.unescape(req.params.url)).pipe(res);
});

app.listen(8022);

