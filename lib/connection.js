var request = require('request');

function Connection(host) {
  if (!(this instanceof Connection)) { return new Connection(host); }
  this.host = host;
}

Connection.prototype.query = function (query, _params, _callback) {
  var params, callback;
  if (typeof _params === "function") {
    callback = _params;
  } else {
    params = _params; callback = _callback;
  }

  request.post({
    url: 'http://' + this.host + '/db/data/transaction',
    json: {
      statements: [
        {
          statement: query.compile(),
          parameters: {
            props: params
          }
        }
      ]
    }
  }, function (error, response, body) {
    if (error || response.statusCode !== 200) { callback(error); }
    else { callback(null, body.results); }
  });
};

module.exports = exports = Connection;

