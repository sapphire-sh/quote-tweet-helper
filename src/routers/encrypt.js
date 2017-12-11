import Express from 'express';

import {
	encrypt,
} from '../utils';

const router = Express.Router();

router.get('/e/:id', (req, res) => {
	const date = new Date();
	const time = date.getTime();

	const result = encrypt(`${time}-${req.params.id}`);

	res.json({
		'id': result,
	});
});

export default router;
