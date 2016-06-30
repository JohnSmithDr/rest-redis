'use strict';

let chai = require('chai');
let should = chai.should();
let client = require('./test-client');
let helper = require('./test-helper');
let debug = require('../src/debug');

describe('/redis/connections', function () {
  
  let id;

  describe('POST /redis/connections', function () {

    it('should be ok', function () {
      return client.auth('127.0.0.1', 6379)
        .then(res => {
          helper.ok(res, /^[0-9a-f]+$/i);
          id = res.body.resp;
        });
    });

  });

  describe('DELETE /redis/connections', function () {
    
    it('should be ok', function () {
      return client.quit(id)
        .then(res => {
          helper.ok(res, 1);
        });
    });

    it('should fail for no connection id in request', function () {
      return client.quit('')
        .then(res => helper.fail(res, 400, /require connection id/i));
    });

    it('should fail for invalid connection id in request', function () {
      return client.quit('foo')
        .then(res => helper.fail(res, 404, /connection not found/i));
    });

  });

});