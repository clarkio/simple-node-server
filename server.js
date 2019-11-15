const express = require('express');
const app = express();
const port = process.env.PORT || 4005;
let runningMessage = 'Server is running on port ' + port;

app.get('/', (req, res) => {
  console.log('API was successfully requested');
  res.send(runningMessage);
});

app.get('/users', (req, res) => {
  res.json([
    {username: 'clarkio', name: 'Brian Clark'}
  ]);
})


const server = app.listen(port, () => {
  console.log(runningMessage);
});

module.exports = server;
