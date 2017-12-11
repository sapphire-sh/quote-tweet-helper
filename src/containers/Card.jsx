import React from 'react';
import {
	Link,
	Redirect,
} from 'react-router-dom';
import {
	connect,
} from 'react-redux';
import PropTypes from 'prop-types';

import {
	fetchDecryptIdIfNeeded,
} from '../actions';

import Clipboard from 'clipboard';

class Card extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			'isMounted': (typeof window === 'undefined'),
		};

		this._handleClick = this._handleClick.bind(this);
	}

	componentWillMount() {
		const {
			dispatch,
		} = this.props;

		const id = this.props.match.params.id;

		dispatch(fetchDecryptIdIfNeeded(id));
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.decryptId.id !== this.props.decryptId.id) {
			if(typeof window !== 'undefined' && window.twttr) {
				window.twttr.widgets.load(
					document.querySelector('blockquote')
				);
			}
		}
	}

	_handleClick() {
		new Clipboard('.copy');
	}

	render() {
		if(this.props.decryptId.id === 0) {
			return (
				<Redirect to="/" />
			);
		}

		const twitterClass = this.props.decryptId.id === -1 ? '' : 'twitter-tweet';

		return (
			<div>
				<blockquote className={twitterClass}>
					<a href={`https://twitter.com/quote_helper/status/${this.props.decryptId.id}`} />
				</blockquote>
				<div className="ui action labeled fluid input">
					<div className="ui label">
						URL
					</div>
					<input type="text" id="url_input" readOnly value={`https://quote.sapphire.sh/i/${this.props.match.params.id}`} />
					<button className="ui right button copy" data-clipboard-target="#url_input">
						Copy
					</button>
				</div>
			</div>
		);
	}
}

Card.propTypes = {
	'dispatch': PropTypes.func.isRequired,
	'match': PropTypes.object.isRequired,
	'decryptId': PropTypes.object.isRequired,
};

export default connect((state) => {
	return {
		'decryptId': state.decryptId,
	};
})(Card);
