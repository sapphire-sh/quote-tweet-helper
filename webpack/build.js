import webpack from 'webpack';
import Promise from 'bluebird';

const webpackAsync = Promise.promisify(webpack);

import clientConfig from './config.client';
import serverConfig from './config.server';

function getConfigs(target) {
	switch(target) {
	case 'client':
		return [
			clientConfig,
		];
	case 'server':
		return [
			serverConfig,
		];
	default:
		return [
			clientConfig,
			serverConfig,
		];
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

const configs = getConfigs(process.env.TARGET);

Promise.each(configs, (config) => {
	return webpackAsync(config)
	.then((stats) => {
		getStats(stats)
		.forEach((stats) => {
			process.stdout.write(`${stats.toString({
				'colors': true,
				'modules': true,
				'children': false,
				'chunks': false,
				'chunkModules': false,
			})}\n`);
		});
	});
})
.catch((err) => {
	console.log(err);
});
