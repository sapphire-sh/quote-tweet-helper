import path from 'path';

import webpack from 'webpack';

import nodeExternals from 'webpack-node-externals';

import baseConfig, {
	src,
	dist,
} from './config.base';

const config = {
	...baseConfig,
	'name': 'server',
	'entry': path.resolve(src, 'server.jsx'),
	'output': {
		'path': dist,
		'filename': 'app.js',
		'libraryTarget': 'commonjs2',
	},
	'externals': [
		nodeExternals({
			'whitelist': [
				/semantic-ui-css/,
			],
		}),
	],
	'target': 'node',
	'node': {
		'__dirname': true,
	},
};

export default config;
