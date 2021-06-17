app.get('/', (req, res) => {
  console.log('API was successfully requested');
  res.send(runningMessage);
});
