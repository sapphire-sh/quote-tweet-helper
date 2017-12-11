import {
	createStore as _createStore,
	applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

export function createStore(preloadedState) {
	if(preloadedState === undefined) {
		preloadedState = {};
	}
	return _createStore(reducers, preloadedState, applyMiddleware(thunk));
}
