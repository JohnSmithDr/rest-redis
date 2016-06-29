'use strict';

let Promise = require('bluebird');
let redis = require('redis');
let uuid = require('uuid');

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

let _clients = new Map();

const _genId = () => uuid.v4().replace(/-/, '');

/**
 * Create redis client and return id and client.
 * @param {string} host
 * @param {number} port
 * @param {object} opts
 * @returns {{id, client}}
 */
function create(host, port, opts) {
  let id = _genId();
  let client = redis.createClient(port, host, opts);
  _clients.set(id, client);
  return { id, client };
}

/**
 * Close redis client and remove by id.
 * @param {string} id
 */
function close(id) {
  let client = _clients.get(id);
  if (client) client.quit();
  _clients.delete(id);
}

/**
 * Get redis client by id.
 * @type {redis.RedisClient}
 */
function get(id) {
  return _clients.get(id);
}

module.exports = { create, close, get };
