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
		path.resolve(src, 'client.jsx'),
	],
	'output': {
		'path': dist,
		'filename': 'bundle.js',
		'publicPath': '/',
	},
};

export default config;
