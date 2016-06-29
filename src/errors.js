'use strict';

const ERRORS = {
  RequireSessionToken: [ 400, 'require_session_token', 'Require session token in request header' ],
  NoConnectionForSession: [ 500, 'no_connection_for_session', 'There is no redis connection for current session' ]
};

Object
  .keys(ERRORS)
  .forEach(key => {
    module.exports[key] = function () {
      let e = ERRORS[key];
      let err = Error(e[2]);
      err.statusCode = e[0];
      err.code = e[1];
      return err;
    }
  });
