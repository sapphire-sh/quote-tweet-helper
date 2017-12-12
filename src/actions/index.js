import 'isomorphic-fetch';

import {
	PORT,
} from '../config';

export const INVALIDATE_ENCRYPT_ID = 'INVALIDATE_ENCRYPT_ID';
export const REQUEST_ENCRYPT_ID = 'REQUEST_ENCRYPT_ID';
export const RECEIVE_ENCRYPT_ID = 'RECEIVE_ENCRYPT_ID';

export const INVALIDATE_DECRYPT_ID = 'INVALIDATE_DECRYPT_ID';
export const REQUEST_DECRYPT_ID = 'REQUEST_DECRYPT_ID';
export const RECEIVE_DECRYPT_ID = 'RECEIVE_DECRYPT_ID';

export function invalidateEncryptId() {
	return {
		'type': INVALIDATE_ENCRYPT_ID,
	};
}

function requestEncryptId() {
	return {
		'type': REQUEST_ENCRYPT_ID,
	};
}

function receiveEncryptId(id) {
	return {
		'type': RECEIVE_ENCRYPT_ID,
		'id': id,
	};
}

function fetchEncryptId(id) {
	return (dispatch) => {
		dispatch(requestEncryptId());

		return fetch(`/e/${id}`)
		.then((data) => {
			return data.json();
		})
		.then((json) => {
			return dispatch(receiveEncryptId(json.id));
		});
	};
}

function shouldFetchEncryptId(state) {
	return state.encryptId.didInvalidate;
}

export function fetchEncryptIdIfNeeded(id) {
	return (dispatch, getState) => {
		if(shouldFetchEncryptId(getState())) {
			return dispatch(fetchEncryptId(id));
		}
		return Promise.resolve();
	};
}

export function invalidateDecryptId() {
	return {
		'type': INVALIDATE_DECRYPT_ID,
	};
}

function requestDecryptId() {
	return {
		'type': REQUEST_DECRYPT_ID,
	};
}

function receiveDecryptId(id) {
	return {
		'type': RECEIVE_DECRYPT_ID,
		'id': id,
	};
}

function fetchDecryptId(id) {
	return (dispatch) => {
		dispatch(requestDecryptId());

		let url;
		if(__CLIENT__) {
			url = `/d/${id}`;
		}
		else {
			url = `http://localhost:${PORT}/d/${id}`;
		}

		return fetch(url)
		.then((data) => {
			return data.json();
		})
		.then((json) => {
			return dispatch(receiveDecryptId(json.id));
		});
	};
}

function shouldFetchDecryptId(state) {
	return state.decryptId.didInvalidate;
}

export function fetchDecryptIdIfNeeded(id) {
	return (dispatch, getState) => {
		if(shouldFetchDecryptId(getState())) {
			return dispatch(fetchDecryptId(id));
		}
		return Promise.resolve();
	};
}
