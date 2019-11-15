app.get('/users', (req, res) => {
  res.json([
    {username: 'clarkio', name: 'Brian Clark'}
  ]);
});
