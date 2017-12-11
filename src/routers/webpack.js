import Express from 'express';

import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

import config from '../../webpack/config.client';

const router = Express.Router();

/* istanbul ignore if */
if(__DEV__) {
	const compiler = webpack(config);
	router.use(WebpackDevMiddleware(compiler, {
		'noInfo': true,
		'quiet': true,
		'publicPath': config.output.publicPath,
	}));
	router.use(WebpackHotMiddleware(compiler));
}

export default router;
