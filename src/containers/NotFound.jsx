import React from 'react';
import {
	Route,
	Redirect,
} from 'react-router-dom';

class NotFound extends React.Component {
	render() {
		return (
			<Redirect to="/" />
		);
	}
}

export default NotFound;
