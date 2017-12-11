import {
	combineReducers,
} from 'redux';
import {
	routerReducer,
} from 'react-router-redux';

import {
	INVALIDATE_ENCRYPT_ID,
	REQUEST_ENCRYPT_ID,
	RECEIVE_ENCRYPT_ID,
	INVALIDATE_DECRYPT_ID,
	REQUEST_DECRYPT_ID,
	RECEIVE_DECRYPT_ID,
} from '../actions';

function encryptId(state = {
	'isFetching': false,
	'didInvalidate': true,
	'id': -1,
}, action) {
	switch(action.type) {
	case INVALIDATE_ENCRYPT_ID:
		return Object.assign({}, state, {
			'didInvalidate': true,
			'id': -1,
		});
	case REQUEST_ENCRYPT_ID:
		return Object.assign({}, state, {
			'isFetching': true,
			'didInvalidate': false,
		});
	case RECEIVE_ENCRYPT_ID:
		return Object.assign({}, state, {
			'isFetching': false,
			'didInvalidate': false,
			'id': action.id,
		});
	default:
		return state;
	}
}

function decryptId(state = {
	'isFetching': false,
	'didInvalidate': true,
	'id': -1,
}, action) {
	switch(action.type) {
	case INVALIDATE_DECRYPT_ID:
		return Object.assign({}, state, {
			'didInvalidate': true,
			'id': -1,
		});
	case REQUEST_DECRYPT_ID:
		return Object.assign({}, state, {
			'isFetching': true,
			'didInvalidate': false,
		});
	case RECEIVE_DECRYPT_ID:
		return Object.assign({}, state, {
			'isFetching': false,
			'didInvalidate': false,
			'id': action.id,
		});
	default:
		return state;
	}
}

const reducers = combineReducers({
	encryptId,
	decryptId,
	'router': routerReducer,
});

export default reducers;
