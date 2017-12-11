import React, {
	Component,
} from 'react';
import {
	Link,
} from 'react-router-dom';

class Footer extends Component {
	render() {
		return (
			<div className="ui black inverted vertical footer segment">
				<div className="ui center aligned container">
					<div className="ui stackable inverted grid">
						<div className="sixteen wide column">
							<p>QuoteTweetHelper는 인용 대상에게 알람이 가지 않는 인용 트윗을 할 수 있도록 도와주는 사이트입니다.</p>
						</div>
						<div className="sixteen wide column">
							<p style={{
								'width': '100%',
							}}>created by <a href="https://twitter.com/sapphire_dev">@sapphire_dev</a>, <a href="https://twitter.com/omniavinco">@omniavinco</a>, and <a href="https://twitter.com/if1live">@if1live</a></p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;

