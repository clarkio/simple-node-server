const request = require('supertest');
const { expect } = require('chai');

const server = require('../server');

describe('Server', function() {
  after(function() {
    server.close();
  });

  it('should return the running message for the default route', function(done) {
    request(server)
      .get('/')
      .expect(200)
      .end(function(error, response) {
        expect(response.text).to.contain('Server is running on port');
        done();
      });
  });
});
