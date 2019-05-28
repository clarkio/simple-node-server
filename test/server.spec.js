const { expect } = require('chai');
const request = require('supertest');

const server = require('../server');

describe('Server', function() {
  after(function() {
    server.close();
  });
  it('/ should respond with running message for default route', function(done) {
    request(server)
      .get('/')
      .expect(200)
      .end((error, res) => {
        expect(res.text).to.contain('Server is listening on port');
        done();
      });
  });
});
