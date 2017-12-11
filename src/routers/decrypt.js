import Express from 'express';

import {
	decrypt,
} from '../utils';

const router = Express.Router();

router.get('/d/:id', (req, res) => {
	try {
		const result = decrypt(req.params.id);

		res.json({
			'id': result.split('-')[1],
		});
	}
	catch(err) {
		res.json({
			'id': 0,
		});
	}
});

export default router;
