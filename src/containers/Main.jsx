import React from 'react';
import {
	Link,
	Redirect,
} from 'react-router-dom';
import {
	connect,
} from 'react-redux';
import PropTypes from 'prop-types';

import url from 'url';

import {
	invalidateEncryptId,
	fetchEncryptIdIfNeeded,
	invalidateDecryptId,
} from '../actions';

class Main extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			'url': '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	_validate(str) {
		const result = url.parse(str);

		if(result.host !== 'twitter.com') {
			return false;
		}

		const token = result.pathname.split('/');
		if(token.length < 4) {
			return false;
		}

		const id = token[3];
		return isNaN(Number(id)) ? false : id;
	}

	handleChange(e) {
		this.setState({
			'url': e.target.value,
		});
	}

	handleSubmit(e) {
		if(this.state.url === '') {
			alert('트윗 URL을 입력하지 않았습니다');
		}
		else {
			const id = this._validate(this.state.url);

			if(id === false) {
				alert('유효한 트윗 URL이 아닙니다');
			}
			else {
				const {
					dispatch,
				} = this.props;

				dispatch(fetchEncryptIdIfNeeded(id));
			}
		}

		e.preventDefault();
	}

	componentWillMount() {
		const {
			dispatch,
		} = this.props;

		dispatch(invalidateEncryptId());
		dispatch(invalidateDecryptId());
	}

	render() {
		if(this.props.encryptId.id !== -1) {
			return (
				<Redirect to={`/i/${this.props.encryptId.id}`} />
			);
		}

		return (
			<div>
				<form className="ui form" onSubmit={this.handleSubmit}>
					<div className="field">
						<label>트윗 URL</label>
						<input type="text" placeholder="https://twitter.com/sapphire_dev/status/765804412522627074" value={this.state.value} onChange={this.handleChange} />
					</div>
					<button className="ui button" type="submit">링크 만들기</button>
				</form>
				<div className="ui center aligned container" style={{
					'marginTop': '40px',
				}}>
					<div className="ui stackable grid">
						<blockquote className="twitter-tweet" style={{
							'display': 'none',
						}}>
							<a href="https://twitter.com/sapphire_dev/status/782250634086977536">October 1, 2016</a>
						</blockquote>
					</div>
				</div>
			</div>
		);
	}
}

Main.propTypes = {
	'dispatch': PropTypes.func.isRequired,
	'encryptId': PropTypes.object.isRequired,
};

export default connect((state) => {
	return {
		'encryptId': state.encryptId,
	};
})(Main);
