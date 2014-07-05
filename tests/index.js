var connect = require('../lib');
var demand = require('must');

describe('n4-connect', function () {
  it('should exist', function () {
    demand(connect).to.exist();
  });
});
