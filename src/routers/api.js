import Express from 'express';

import {
	createPath,
} from '../utils';

const router = Express.Router();

router.get('/api', (req, res) => {
	const id = req.query.id;
	if(isNaN(Number(id))) {
		res.status(400);
		res.json({
			'err': 'invalid id',
		});
	}
	else {
		let host = req.query.host;
		if(host === undefined) {
			host = '';
		}

		const url = host + createPath(id);
		res.json({
			'url': url,
		});
	}
});

export default router;
