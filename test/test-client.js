'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let Promise = global.Promise = require('bluebird');

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

module.exports.mset = (id, data) => {
  return chai.request(baseUrl).put('/strings').set('x-connection-id', id).send({ data })
    .then(res => res, err => err.response);
};

module.exports.mget = (id, keys) => {
  return chai.request(baseUrl).get('/strings').set('x-connection-id', id).query({ keys: keys.join(',') })
    .then(res => res, err => err.response);
};

module.exports.set = (id, key, value) => {
  return chai.request(baseUrl).put(`/strings/${key}`).set('x-connection-id', id).send({ value })
    .then(res => res, err => err.response);
};

module.exports.get = (id, key) => {
  return chai.request(baseUrl).get(`/strings/${key}`).set('x-connection-id', id)
    .then(res => res, err => err.response);
};

module.exports.keys = (id, pattern) => {
  return chai.request(baseUrl).get('/keys').set('x-connection-id', id).query({ pattern })
    .then(res => res, err => err.response);
};

module.exports.del = (id, key) => {
  return chai.request(baseUrl).delete(`/keys/${key}`).set('x-connection-id', id)
    .then(res => res, err => err.response);
};

module.exports.delKeys = (id, keys) => {
  return chai.request(baseUrl).delete(`/keys`).set('x-connection-id', id).query({ keys: keys.join(',') })
    .then(res => res, err => err.response);
};