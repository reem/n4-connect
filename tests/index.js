var connect = require('../lib');
var demand = require('must');
var http = require('http');

describe('n4-connect', function () {
  it('should exist', function () {
    demand(connect).to.exist();
  });

  describe('when called', function () {
    it('should try to connect to localhost:7474', function () {
      var connection = connect();
      demand(connection.host).to.equal('127.0.0.1:7474');
    });

    describe('with a port number', function () {
      it('should try to connect to that port', function () {
        var connection = connect(3456);
        demand(connection.host).to.equal('127.0.0.1:3456');
      });
    });

    describe('with a url', function () {
      it('should try to connect to that url', function () {
        var connection = connect('127.0.0.1:3000');
        demand(connection.host).to.equal('127.0.0.1:3000');
      });
    });
  });
});

