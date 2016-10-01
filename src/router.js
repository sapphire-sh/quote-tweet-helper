'use strict';

let router = require('express').Router();

const CONFIG = require('../config');
let oauth = new (require('oauth').OAuth)(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	CONFIG.twitter.consumer_key,
	CONFIG.twitter.consumer_secret,
	'1.0A',
	'https://quote.sapphire.sh/callback',
	'HMAC-SHA1'
);

router.get('/', (req, res) => {
	console.log(req.session.oauth);
	res.render('index', {
		oauth: req.session.oauth
	});
});

router.get('/authenticate', (req, res) => {
	oauth.getOAuthRequestToken((err, oauth_token, oauth_token_secret) => {
		if(err) {
			res.json(err);
		}
		else {
			req.session.oauth = {
				oauth_token: oauth_token,
				oauth_token_secret: oauth_token_secret
			};
			res.redirect('https://twitter.com/oauth/authenticate?oauth_token=' + oauth_token);
		}
	});
});

router.get('/signout', (req, res) => {
	req.session.oauth = {};
	delete req.session.oauth;
	res.redirect('/');
});

router.get('/callback', (req, res) => {
	if(req.session.oauth) {
		oauth.getOAuthAccessToken(
			req.session.oauth.oauth_token,
			req.session.oauth.oauth_token_secret,
			req.query.oauth_verifier,
			(err, access_token, access_token_secret) => {
				if(err) {
					res.json(err);
				}
				else {
					req.session.oauth = CONFIG.twitter;
					req.session.oauth.access_token = access_token;
					req.session.oauth.access_token_secret = access_token_secret;
					res.redirect('/');
				}
			}
		);
	}
});

module.exports = router;

