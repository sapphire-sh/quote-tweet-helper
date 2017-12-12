import querystring from 'querystring';

import Express from 'express';

import cheerio from 'cheerio';

const router = Express.Router();

router.get('/t/:id', (req, res) => {
	fetch(`https://twitter.com/quote_helper/status/${req.params.id}`)
	.then((data) => {
		return data.text();
	})
	.then((html) => {
		let $ = cheerio.load(html);

		let title = $('meta[property="og:title"]').attr('content');
		/* istanbul ignore else */
		if(title) {
			const match = title.match(/([\w\ ]+) on Twitter$/);
			/* istanbul ignore else */
			if(match) {
				title = match[1];
			}
			else {
				throw 'title not found';
			}
		}
		else {
			throw 'title not found';
		}
		let description = $('meta[property="og:description"]').attr('content');
		/* istanbul ignore if */
		if(description === undefined) {
			throw 'description not found';
		}
		let image = $('meta[property="og:image"]').attr('content');
		let media;
		/* istanbul ignore else */
		if(image) {
			const match = image.match(/^https:\/\/pbs.twimg.com\/(\w+)\//);
			/* istanbul ignore else */
			if(match) {
				media = (match[1] === 'media');
				image = querystring.escape(image);
			}
			else {
				throw 'media not found';
			}
		}
		else {
			throw 'image not found';
		}
		let url = $('meta[property="og:url"]').attr('content');
		let creator;
		/* istanbul ignore else */
		if(url) {
			const match = url.match(/^https:\/\/twitter.com\/(\w+)\//);
			/* istanbul ignore else */
			if(match) {
				creator = match[1];
			}
			else {
				throw 'screen name not found';
			}
		}
		else {
			throw 'screen name not found';
		}

		res.json({
			'id': req.params.id,
			'title': title,
			'creator': creator,
			'description': description,
			'image': `https://quote.sapphire.sh/image/${image}`,
			'media': media,
		});
	})
	.catch(/* istanbul ignore next */(err) => {
		res.json(err);
	});
});

export default router;
