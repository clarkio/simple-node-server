const express = require('express');
const app = express();
const port = process.env.PORT || 4005;
let runningMessage = 'Server is running on port ' + port;

const indexroute = require('./routes/index');

const server = app.listen(port, () => {
  console.log(runningMessage);
});

module.exports = server;
