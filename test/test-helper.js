'use strict';

require('chai').should();

module.exports.ok = (res, message) => {
  res.statusCode.should.equal(200);
  console.log(res.body);
  if (message instanceof RegExp) res.body.resp.should.match(message);
  else if (typeof message === 'object') res.body.resp.should.deep.equal(message);
  else if (typeof message === 'number') res.body.resp.should.equal(message);
  else if (typeof message === 'string') res.body.resp.should.equal(message);
};

module.exports.fail = (res, status, message) => {
  res.statusCode.should.equal(status);
  console.log(res.body);
  if (message instanceof RegExp) res.body.error.should.match(message);
  else if (typeof message === 'object') res.body.error.should.deep.equal(message);
  else if (typeof message === 'string') res.body.error.should.equal(message);
};


