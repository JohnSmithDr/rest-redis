'use strict';

let chai = require('chai');
let should = chai.should();
let client = require('./test-client');
let helper = require('./test-helper');
let debug = require('../src/debug');

describe('/redis/command', function () {

  let _connId;

  before(function () {
    return client.auth('127.0.0.1', 6379).then(res => _connId = res.body.reply);
  });

  after(function () {
    return client.quit(_connId);
  });

  describe('POST /redis/command', function () {

    it('should be ok', function () {

    });

    it('should fail for no parameter command', function () {
      return client.command(_connId, { args: [] })
        .then(res => {
          debug.log(res.body);
          helper.fail(res, 400, /Missing required property: command/i);
        });
    });

    it('should fail for no parameter args', function () {
      return client.command(_connId, { command: 'TIME' })
        .then(res => {
          debug.log(res.body);
          helper.fail(res, 400, /Missing required property: args/i);
        });
    });

    it('should fail for invalid type of parameter command', function () {
      return client.command(_connId, { command: 0, args: [] })
        .then(res => {
          debug.log(res.body);
          helper.fail(res, 400, /invalid type/i);
        });
    });

    it('should fail for invalid type of parameter args', function () {
      return client.command(_connId, { command: 'TIME', args: 0 })
        .then(res => {
          debug.log(res.body);
          helper.fail(res, 400, /invalid type/i);
        });
    });

    it('should fail for invalid command', function () {
      return client.command(_connId, { command: 'FOO', args: [] })
        .then(res => {
          debug.log(res.body);
          helper.fail(res, 400, /invalid command/i);
        });
    });

    it('should fail for invalid args', function () {
      return client.command(_connId, { command: 'GET', args: [] })
        .then(res => {
          debug.log(res.body);
          helper.fail(res, 500, /wrong number of arguments/i);
        });
    });

  });

});