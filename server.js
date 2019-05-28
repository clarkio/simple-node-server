const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const runningMessage = 'Server is listening on port ' + port;

app.get('/', (req, res) => {
  console.log('API was successfully requested');
  res.send(runningMessage);
});

const server = app.listen(port, () => {
  console.log(runningMessage);
});

module.exports = server;
