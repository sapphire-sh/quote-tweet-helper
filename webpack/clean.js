import rimraf from 'rimraf';

import {
	dist,
} from './config.base';

rimraf(dist, (err) => {
	if(err) {
		console.log(err);
	}
});
