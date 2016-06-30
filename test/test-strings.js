'use strict';

let Promise = require('bluebird');
let chai = require('chai');
let should = chai.should();
let client = require('./test-client');
let helper = require('./test-helper');
let debug = require('../src/debug');

describe.only('/redis/strings', function () {

  let id;
  
  before(function () {
    return client.auth().then(res => id = res.body.reply);
  });
  
  after(function () {
    return client.quit(id);
  });

  describe('PUT /redis/strings', function () {

    it('should be ok', function () {
      return client
        .mset(id, { foo: 'foo', bar: 'bar' })
        .then(res => {
          debug.log(res.body);
          helper.ok(res, 'OK');
        });
    });

  });

  describe('GET /redis/strings', function () {

    it('should be ok', function () {
      return client
        .mget(id, ['foo', 'bar'])
        .then(res => {
          debug.log(res.body);
          helper.ok(res, ['foo', 'bar']);
        });
    });

  });

  describe('PUT /redis/strings/:key', function () {

    it('should be ok', function () {
      return Promise.all([
        client
          .set(id, 'foo', 'bar')
          .then(res => {
            debug.log(res.body);
            helper.ok(res, 'OK');
          }),
        client
          .set(id, 'bar', 'foo')
          .then(res => {
            debug.log(res.body);
            helper.ok(res, 'OK');
          })
      ]);
    });
  });

  describe('GET /redis/strings', function () {

    it('should be ok', function () {
      return Promise.all([
        client.get(id, 'foo').then(res => {
          debug.log(res.body);
          helper.ok(res, 'bar');
        }),
        client.get(id, 'bar').then(res => {
          debug.log(res.body);
          helper.ok(res, 'foo');
        })
      ]);
    });

  });

});