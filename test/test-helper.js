'use strict';

require('chai').should();

module.exports.ok = (res, message) => {
  res.statusCode.should.equal(200);
  if (message instanceof RegExp) res.body.reply.should.match(message);
  else if (typeof message === 'object') res.body.reply.should.deep.equal(message);
  else if (typeof message === 'number') res.body.reply.should.equal(message);
  else if (typeof message === 'string') res.body.reply.should.equal(message);
};

module.exports.fail = (res, status, message) => {
  res.statusCode.should.equal(status);
  if (message instanceof RegExp) res.body.error.should.match(message);
  else if (typeof message === 'object') res.body.error.should.deep.equal(message);
  else if (typeof message === 'string') res.body.error.should.equal(message);
};


