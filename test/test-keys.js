'use strict';

let Promise = require('bluebird');
let chai = require('chai');
let should = chai.should();
let client = require('./test-client');
let helper = require('./test-helper');
let debug = require('../src/debug');

describe.only('/redis/keys', function () {

  let id;

  before(function () {
    return client.auth().then(res => id = res.body.reply);
  });

  after(function () {
    return client.quit(id);
  });

  describe('GET /redis/keys?pattern=', function () {

    before(function () {
      return client.mset(id, { 'test-foo': 1, 'test-bar': 2 });
    });

    after(function () {
      return client.delKeys(id, ['test-foo', 'test-bar']);
    });

    it('should be ok', function () {
      return client.keys(id, 'test-*').then(res => {
        debug.log(res.body);
        helper.ok(res, ['test-foo', 'test-bar']);
      });
    });

  });

  describe('DELETE /redis/keys?keys=', function () {

    before(function () {
      return client.mset(id, { foo: 1, bar: 2 });
    });

    it('should be ok', function () {
      return client.delKeys(id, ['foo', 'bar']).then(res => {
        debug.log(res.body);
        helper.ok(res, 2);
      });
    });

  });

  describe('DELETE /redis/keys/:key', function () {

    before(function () {
      return client.mset(id, { foo: 1, bar: 2 });
    });

    it('should be ok', function () {
      return Promise.all([
        client.del(id, 'foo').then(res => {
          debug.log(res.body);
          helper.ok(res, 1);
        }),
        client.del(id, 'bar').then(res => {
          debug.log(res.body);
          helper.ok(res, 1);
        })
      ]);
    });

  });

});