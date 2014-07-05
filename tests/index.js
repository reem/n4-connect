var connect = require('../lib');
var demand  = require('must');
var http    = require('http');

function MockQuery(raw) {
  this.raw = raw;
}

MockQuery.prototype.compile = function () { return this.raw; };

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

  describe('when connected', function () {
    var spyrq, spyrs, spybody, server, connection;

    before(function () {
      server = http.createServer(function (req, res) {
        spyrq = req;
        spyrs = res;
        spybody = '';
        req.on('data', function (chunk) {
          spybody += chunk;
        });
        req.on('end', function () {
          res.end("Received.");
        });
      }).listen(7474);
      connection = connect();
    });

    after(function () {
      server.close();
    });

    describe('and given a query', function () {
      it('should transmit that string to the database', function (done) {
        connection.query(new MockQuery("RETURN 42 AS solution"), function (err) {
          if (err) { throw err; }
          demand(JSON.parse(spybody).statements[0].statement).to.equal("RETURN 42 AS solution");
          done();
        });
      });
    });
  });
});

