import React from 'react';
import {
	Switch,
	Route,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

import routes from '../routes';

import 'semantic-ui-css/semantic.min.css';
import '../styles.css';

class App extends React.Component {
	render() {
		return (
			<div>
				<Header />
				<div className="ui main container">
					<Switch>
						{
							routes.map((route, i) => {
								return (
									<Route key={i} {...route} />
								);
							})
						}
					</Switch>
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
