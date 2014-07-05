var connect = require('../lib');
var demand = require('must');
var shield = require('shield-func');
var http = require('http');

describe('n4-connect', function () {
  it('should exist', function () {
    demand(connect).to.exist();
  });

  describe('when called', function () {
    it('should try to connect to localhost:7474', function (done) {
      var server = http.createServer(shield(done)).listen(7474);
      connect();
      server.close();
    });

    describe('with a port number', function () {
      it('should try to connect to that port', function (done) {
        var server = http.createServer(shield(done)).listen(3456);
        connect(3456);
        server.close();
      });
    });

    describe('with a url', function () {
      it('should try to connect to that url', function (done) {
        var server = http.createServer(shield(done)).listen(3000);
        connect('127.0.0.1:3000');
        server.close();
      });
    });
  });
});
