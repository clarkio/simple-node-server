const appInsights = require('applicationinsights');
appInsights.setup('7aedcc23-9939-48ad-89a7-b00e6b138368').start();

const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const runningMessage = 'Server is running on port ' + port;

app.get('/', (req, res) => {
  console.log('API was successfully requested');
  res.send(runningMessage);
});

app.listen(port, () => {
  console.log(runningMessage);
});
