import Express from 'express';

import React from 'react';
import {
	renderToString,
} from 'react-dom/server';
import {
	StaticRouter,
	matchPath,
} from 'react-router-dom';
import {
	Provider,
} from 'react-redux';

import {
	createStore,
} from '../store';

import routes from '../routes';

import {
	invalidateDecryptId,
	fetchDecryptIdIfNeeded,
} from '../actions';

import App from '../containers/App';
import Card from '../containers/Card';

import HTML from '../utils/HTML';

const router = Express.Router();

const store = createStore();

router.get('*', (req, res) => {
	const promises = [];

	routes.some((route) => {
		const match = matchPath(req.url, route);
		if(match) {
			switch(route.name) {
			case 'Card':
				store.dispatch(invalidateDecryptId());

				const promise = store.dispatch(fetchDecryptIdIfNeeded(match.params.id));

				promises.push(promise);
			}
			return true;
		}
		return false;
	});

	return Promise.all(promises)
	.then(() => {
		let context = {};
		const component = (
			<Provider store={store}>
				<StaticRouter location={req.url} context={context}>
					<App />
				</StaticRouter>
			</Provider>
		);
		const html = renderToString(component);

		res.send(HTML(html, store.getState()));
	})
	.catch(/* istanbul ignore next */(err) => {
		console.log(err);
		res.json(err);
	});
});

export default router;
