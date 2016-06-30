'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let Promise = global.Promise = require('bluebird');

chai.use(chaiHttp);

let baseUrl = 'http://127.0.0.1:6382/redis';

module.exports.baseUrl = baseUrl;

module.exports.auth = (host, port, pass) => {
  return chai.request(baseUrl).post('/connections').send({ host, port, auth: pass })
    .then(res => res, err => err.response);
};

module.exports.quit = (connId) => {
  return chai.request(baseUrl).delete('/connections').set('x-connection-id', connId)
    .then(res => res, err => err.response);
};