/*
test express server
reference
https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/
https://github.com/visionmedia/supertest/blob/master/test/supertest.js
*/

const request = require('supertest');
const should = require('should');

describe('quote twitter helper', function() {
	var app;
	beforeEach(function() {
		app = require('../src/app');
	});

	it('response to /', function(done) {
		request(app).get('/').expect(200, done);
	});
	
	context('card', function() {
		it('empty card', function(done) {
			request(app).get('/i').expect(302, done);
		});
		
		it('invalid card', function(done) {
			request(app).get('/i/invalid').expect(302, done);
		});
		
		it('valid card', function(done) {
			request(app).get('/i/faf30c90b03c093c25767b1506e3c6e1aa995117e474112d2b4d8b1afe807ddb63936f84a3b91114d069b3cf382b2a95').expect(200, done);
		});
	});

	context('api', function() {
		it('empty id', function(done) {
			request(app).get('/api').expect(400, function(err, res) {
				res.body.should.have.property('err');
				done();
			});
		});
		it('invalid id', function(done) {
			request(app).get('/api').query({id: 'text'}).expect(400, function(err, res) {
				res.body.should.have.property('err');
				done();
			});
		});
		it('correct id', function(done) {
			request(app).get('/api').query({id: '776483025756442624'}).expect(200, function(err, res) {
				res.body.should.have.property('url');
				done();
			});
		});
		it('correct id with host', function(done) {
			var host = 'http://sample.host.com';
			request(app).get('/api').query({id: '776483025756442624', host: host})
			.expect(200, function(err, res) {
				res.body.should.have.property('url');
				var url = res.body.url;
				url.should.be.startWith(host);
				done();
			});
		});
	});
});

