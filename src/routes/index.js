import React from 'react';

import Main from '../containers/Main';
import Card from '../containers/Card';

import NotFound from '../containers/NotFound';

const routes = [
	{
		'path': '/',
		'exact': true,
		'name': 'Main',
		'component': Main,
	},
	{
		'path': '/i/:id',
		'exact': true,
		'name': 'Card',
		'component': Card,
	},
	{
		'path': '*',
		'name': 'NotFound',
		'component': NotFound,
	},
];

export default routes;
