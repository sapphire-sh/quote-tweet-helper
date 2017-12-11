import React from 'react';
import {
	Link,
} from 'react-router-dom';

class Header extends React.Component {
	render() {
		return (
			<div>
				<a href="https://github.com/sapphiredev/quote-tweet-helper" rel="noopener noreferrer" target="_blank"><img style={{
					'position': 'fixed',
					'top': 0,
					'right': 0,
					'border': 0,
					'zIndex': 1000,
				}} src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png" /></a>
				<div className="ui fixed inverted menu">
					<div className="ui container">
						<a href="/" className="item">QuoteTweetHelper</a>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
