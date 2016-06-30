'use strict';

let express = require('express');
let debug = require('./src/debug');

let port = 6382;
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** log every request url **/
app.use(function(req, res, next) {
  debug.log('[%s] %s', req.method, req.originalUrl);
  next();
});

/** setup routes **/
app.get('/', (req, res) => {
  res.json({ message: 'Hello, Rest Redis' });
});

/** route rest redis **/
app.use('/redis', require('./index').routes);

/** startup **/
app.listen(port, (err) => {
  if (err) {
    debug.error(err);
    return;
  }
  debug.log('Server listening on port: %s', port);
});
