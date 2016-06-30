'use strict';

let express = require('express');

let port = 6000;
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** log every request url **/
app.use(function(req, res, next) {
  console.log('[%s] %s', req.method, req.originalUrl);
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
    console.error(err);
    return;
  }
  console.log('Server listening on port: %s', port);
});
