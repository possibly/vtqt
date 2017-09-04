const express = require('express');
const ecstatic = require('ecstatic');
const http = require('http');
const app = express();

app.use(ecstatic({
  root: __dirname,
}));

http.createServer(app).listen(8080);
