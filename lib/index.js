var Connection = require('./connection.js');

function connect(host) {
  if(!host) {
    return connect('127.0.0.1:7474');
  } else if (typeof host === 'number') {
    return connect('127.0.0.1:' + host.toString());
  }

  return new Connection(host);
}

module.exports = exports = connect;

