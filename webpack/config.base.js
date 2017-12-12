import path from 'path';

import webpack from 'webpack';

import ExtractTextPlugin from 'extract-text-webpack-plugin';

const dist = path.resolve(__dirname, '../dist');
const src = path.resolve(__dirname, '../src');

const config = {
	'module': {
		'rules': [
			{
				'test': /\.jsx?$/,
				'use': {
					'loader': 'babel-loader',
				},
			},
			{
				'test': /\.css$/,
				'use': ExtractTextPlugin.extract({
					'fallback': 'style-loader',
					'use': [
						{
							'loader': 'css-loader',
						},
					],
				}),
			},
			{
				'test': /\.(png|jpe?g|svg)$/,
				'use': {
					'loader': 'url-loader',
					'options': {
						'limit': 8192,
					},
				},
			},
			{
				'test': /\.txt$/,
				'use': {
					'loader': 'file-loader',
				},
			},
			{
				'test': /\.(ttf|eot|woff2?)$/,
				'use': {
					'loader': 'file-loader',
					'options': {
						'name': 'fonts/[name].[ext]',
					},
				},
			},
		],
	},
	'resolve': {
		'extensions': [
			'.js',
			'.jsx',
		],
	},
	'plugins': [
		new webpack.DefinePlugin({
			'__DEV__': process.env.NODE_ENV === 'dev',
			'__TEST__': process.env.NODE_ENV === 'test',
			'__CLIENT__': process.env.TARGET === 'client',
		}),
		new ExtractTextPlugin('styles.css'),
	],
};

export default config;

export {
	dist,
	src,
};
