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
