'use strict';

global.Promise = require('bluebird');

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

let baseUrl = 'http://127.0.0.1:6382/redis';

module.exports.baseUrl = baseUrl;

module.exports.auth = (host, port, pass) => {
  host = host || '127.0.0.1';
  port = port || 6379;
  return chai.request(baseUrl).post('/connections').send({ host, port, auth: pass })
    .then(res => res, err => err.response);
};

module.exports.quit = (connId) => {
  return chai.request(baseUrl).delete('/connections').set('x-connection-id', connId)
    .then(res => res, err => err.response);
};

module.exports.command = (connId, body) => {
  return chai.request(baseUrl).post('/command').set('x-connection-id', connId).send(body)
    .then(res => res, err => err.response);
};
