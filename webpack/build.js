import webpack from 'webpack';
import Promise from 'bluebird';

const webpackAsync = Promise.promisify(webpack);

import clientDevConfig from './config.client.dev';
import clientProdConfig from './config.client.prod';
import serverConfig from './config.server';

let clientConfig;
if(process.env.NODE_ENV === 'prod') {
	clientConfig = clientProdConfig;
}
else {
	clientConfig = clientDevConfig;
}

function getConfig(target) {
	switch(target) {
	case 'client':
		if(process.env.NODE_ENV === 'prod') {
			return clientProdConfig;
		}
		else {
			return clientDevConfig;
		}
	case 'server':
		return serverConfig;
	}
}

function getStats(stats) {
	if(stats.stats === undefined) {
		return [
			stats,
		];
	}
	else {
		return stats.stats;
	}
}

const config = getConfig(process.env.TARGET);

if(config === undefined) {
	console.log('build target is not set');
}
else {
	webpackAsync(config)
	.then((stats) => {
		process.stdout.write(`${stats.toString({
			'colors': true,
			'modules': true,
			'children': false,
			'chunks': false,
			'chunkModules': false,
		})}\n`);
	})
	.catch((err) => {
		console.log(err);
	});
}
