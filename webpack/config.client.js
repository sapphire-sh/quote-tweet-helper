import fs from 'fs';
import path from 'path';

import webpack from 'webpack';

import baseConfig, {
	src,
	dist,
} from './config.base';

const config = {
	...baseConfig,
	'name': 'client',
	'entry': [
		'webpack-hot-middleware/client',
		path.resolve(src, 'client.jsx'),
	],
	'output': {
		'path': dist,
		'filename': 'bundle.js',
		'publicPath': '/',
	},
	'plugins': [
		...baseConfig.plugins,
		new webpack.HotModuleReplacementPlugin(),
	],
};

export default config;
