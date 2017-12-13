import request from 'supertest';

import server from '../src/server';

jest.setTimeout(60000);

describe('quote twitter helper', () => {
	const tweetId = '782250634086977536';
	const encryptedId = 'c8e97cce0db639672277c41b7034f59c408c53e676613fe89ed389071436b83f0590f94663745a99d526c6a84a041a19';

	const image = 'Ctscrb6UEAQs1xK.png';
	const imageUrl = `https://pbs.twimg.com/media/${image}:large`;
	const encodedImageUrl = encodeURIComponent(imageUrl);

	const encryptedIdWithoutMedia = '52f8616fae36c9ccecba54c196de7343053e5f8111abf843e3247089b53a3d258900ec1cf3927795f1aad2c382fe53d9';

	describe('client', () => {
		it('valid request to /', (done) => {
			request(server)
			.get('/')
			.expect(200, (err, res) => {
				done();
			});
		});

		it('valid request to /e/:id', (done) => {
			request(server)
			.get(`/e/${tweetId}`)
			.expect(200, (err, res) => {
				expect(res.body)
				.toEqual(expect.objectContaining({
					'id': expect.any(String),
				}));

				done();
			});
		});

		it('valid request to /d/:id', (done) => {
			request(server)
			.get(`/d/${encryptedId}`)
			.expect(200, (err, res) => {
				expect(res.body)
				.toEqual({
					'id': tweetId,
				});

				done();
			});
		});

		it('invalid request to /d/:id', (done) => {
			request(server)
			.get('/d/invalid')
			.expect(200, (err, res) => {
				expect(res.body)
				.toEqual({
					'id': 0,
				});

				done();
			});
		});

		it('valid request to /t/:id', (done) => {
			request(server)
			.get(`/t/${tweetId}`)
			.expect(200, (err, res) => {
				expect(res.body)
				.toEqual({
					'id': tweetId,
					'creator': 'sapphire_dev',
					'title': 'sapphire',
					'description': '“https://t.co/Hvub1sC6fR\n인용 대상에게 알람이 가지 않는 인용 트윗을 할 수 있도록 도와주는 사이트를 만들었습니다.\n잘 활용해주세요.”',
					'image': 'https://quote.sapphire.sh/image/https%3A%2F%2Fpbs.twimg.com%2Fmedia%2FCtscrb6UEAQs1xK.png%3Alarge',
					'media': true,
				});

				done();
			});
		});

		it('invalid request to /t/:id', (done) => {
			request(server)
			.get('/t/invalid')
			.expect(200, (err, res) => {
				expect(res.body)
				.toEqual('title not found');

				done();
			});
		});

		it('valid request to /image/:uri', (done) => {
			request(server)
			.get(`/image/${encodedImageUrl}`)
			.expect(200, (err, res) => {
				done();
			});
		});

		it('not found', (done) => {
			request(server)
			.get('/not_found')
			.expect(200, (err, res) => {
				done();
			});
		});

		it('twitter bot', (done) => {
			request(server)
			.get('/')
			.set('User-Agent', 'Twitterbot')
			.expect(200, (err, res) => {
				done();
			});
		});
	});

	describe('card', () => {
		it('invalid card', (done) => {
			request(server)
			.get('/i/invalid')
			.expect(200, (err, res) => {
				done();
			});
		});

		it('valid card', (done) => {
			request(server)
			.get(`/i/${encryptedId}`)
			.expect(200, (err, res) => {
				done();
			});
		});

		it('twitter bot with media', (done) => {
			request(server)
			.get(`/i/${encryptedId}`)
			.set('User-Agent', 'Twitterbot')
			.expect(200, (err, res) => {
				done();
			});
		});

		it('twitter bot without media', (done) => {
			request(server)
			.get(`/i/${encryptedIdWithoutMedia}`)
			.set('User-Agent', 'Twitterbot')
			.expect(200, (err, res) => {
				done();
			});
		});
	});

	describe('api', () => {
		it('empty id', (done) => {
			request(server)
			.get('/api')
			.expect(400, (err, res) => {
				done();
			});
		});

		it('invalid id', (done) => {
			request(server)
			.get('/api')
			.query({
				'id': 'invalid',
			})
			.expect(400, (err, res) => {
				done();
			});
		});

		it('valid id', (done) => {
			request(server)
			.get('/api')
			.query({
				'id': tweetId,
			})
			.expect(200, (err, res) => {
				expect(res.body)
				.toEqual(expect.objectContaining({
					'url': expect.stringMatching(/^\/i\/\w+/),
				}));

				done();
			});
		});

		it('valid id with host', (done) => {
			const host = 'https://www.sapphire.sh';
			const regexp = new RegExp(`^${host}/i/\\w+`);

			request(server)
			.get('/api')
			.query({
				'id': tweetId,
				'host': host,
			})
			.expect(200, (err, res) => {
				expect(res.body)
				.toEqual(expect.objectContaining({
					'url': expect.stringMatching(regexp),
				}));

				done();
			});
		});
	});

	afterAll(() => {
		server.close();
	});
});

