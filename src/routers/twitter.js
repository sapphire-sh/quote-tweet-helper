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

		let title = $('meta[property="og:title"]')
		.attr('content');
		if(title) {
			title = title.split(' ');
			title.pop();
			title.pop();
			title = title.join(' ');
			let description = $('meta[property="og:description"]')
			.attr('content');
			let image = $('meta[property="og:image"]')
			.attr('content');
			let media = (image.split('/')[3] === 'media');
			image = querystring.escape(image);

			res.json({
				'id': req.params.id,
				'title': title,
				'description': description,
				'image': `https://quote.sapphire.sh/image/${image}`,
				'media': media,
			});
		}
		else {
			res.json({});
		}
	})
	.catch(/* istanbul ignore next */(err) => {
		res.json(err);
	});
});

export default router;
