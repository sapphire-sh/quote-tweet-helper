import Express from 'express';

import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';

import {
	decrypt,
} from '../utils';

import card from '../utils/card';

const router = Express.Router();

/* istanbul ignore if */
if(!__TEST__) {
	router.use(morgan('common'));
}
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
	'extended': false,
}));
router.use(cookieParser());
router.use(compression());
router.use(cors());

router.use('/', Express.static('../dist'));

router.use((req, res, next) => {
	if(req.get('User-Agent') === 'Twitterbot') {
		const match = req.url.match(/^\/i\/(\w+)$/);
		if(match === null) {
			next();
		}
		else {
			const decryptedId = decrypt(match[1]);
			const id = decryptedId.split('-')[1];

			fetch(`http://localhost:8022/t/${id}`)
			.then((data) => {
				return data.json();
			})
			.then((json) => {
				const html = card(json);
				res.send(html);
			});
		}
	}
	else {
		next();
	}
});

export default router;
