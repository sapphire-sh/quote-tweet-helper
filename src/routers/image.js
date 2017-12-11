import querystring from 'querystring';

import Express from 'express';

import request from 'request';

const router = Express.Router();

router.get('/image/:url', (req, res) => {
	const url = querystring.unescape(req.params.url);

	fetch(url)
	.then((data) => {
		res.send(data);
	});
});

export default router;
