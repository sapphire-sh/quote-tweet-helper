import path from 'path';

import webpack from 'webpack';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

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
				'use': [
					{
						'loader': MiniCssExtractPlugin.loader,
					},
					{
						'loader': 'css-loader',
					},
				],
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
		new MiniCssExtractPlugin({
			'filename': 'styles.css',
		}),
	],
	'mode': process.env.NODE_ENV === 'dev' ? 'development': 'production',
};

export default config;

export {
	dist,
	src,
};
