import React from 'react';
import {
	hydrate,
} from 'react-dom';
import {
	Provider,
} from 'react-redux';
import {
	createBrowserHistory,
} from 'history';
import {
	ConnectedRouter,
} from 'react-router-redux';
import thunk from 'redux-thunk';

import {
	createStore,
} from './store';

import App from './containers/App';

import ReactGA from 'react-ga';

ReactGA.initialize('UA-85061946-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const history = createBrowserHistory();
const store = createStore(preloadedState);

if(module.hot) {
	module.hot.accept();
}

const AppRouter = () => {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</Provider>
	);
};

hydrate(<AppRouter />, document.querySelector('#app'));
