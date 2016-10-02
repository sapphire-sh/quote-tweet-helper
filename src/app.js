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

app.get('/i', (req, res) => {
	res.redirect('/');
});

app.post('/i', (req, res) => {
	let id = req.body.url.split('/').pop();
	res.redirect(createPath(id));
});

app.get('/i/:id', (req, res) => {
	try {
		let id = decrypt(req.params.id).split('-').pop();
		const twitterUrl = `https://twitter.com/quote_helper/status/${id}`;
		request(twitterUrl, (err, response, html) => {
			if (err) {
				res.json(err);
			} else {
				let $ = cheerio.load(html);

				let title = $('meta[property="og:title"]').attr('content');
				if (title) {
					title = title.split(' ');
					title.pop();
					title.pop();
					title = title.join(' ');
					let description = $('meta[property="og:description"]')
						.attr('content');
					let image = $('meta[property="og:image"]')
						.attr('content');
					let media = (image.split('/')[3] === 'media');
					image = querystring.escape(image);

					res.render('card', {
						id: id,
						title: title,
						description: description,
						image: `https://quote.sapphire.sh/image/${image}`,
						media: media
					});
				} else {
					res.redirect('/');
				}
			}
		});
	}
	catch (e) {
		res.redirect('/');
	}
});

app.get('/api', (req, res) => {
	var id = req.query.id;
	var idReg = /^.\d+$/;
	if(!idReg.test(id)) {
		res.status(400).json({err: 'id is not number'});
		return;
	}

	var host = req.query.host;
	if(!host) {
		host = "";
	}

	var url = host + createPath(id)
	res.json({url: url});
});

function createPath(id) {
	return `/i/${encrypt(`${new Date().getTime()}-${id}`)}`;
}

/**
 * encrypt text for using as id
 * @param {string} text nounce attached text
 * @return {string} encrypted data in hexadecimal form.
 */
function encrypt(text) {
	let cipher = crypto.createCipher(algorithm, password);
	let enc = cipher.update(text, 'utf8', 'hex');
	enc += cipher.final('hex');
	return enc;
}

/**
 * decrypt id.
 * @param {string} text encrypted data in hexadecimal form
 * @return {string} decrypted value
 */
function decrypt(text) {
	let decipher = crypto.createDecipher(algorithm, password);
	let dec = decipher.update(text, 'hex', 'utf8');
	dec += decipher.final('utf8');
	return dec;
}

app.get('/image/:url', (req, res) => {
	request.get(querystring.unescape(req.params.url)).pipe(res);
});

app.listen(8022);

module.exports = app;

