
const express = require('express');
const app = express();
const runningMessage = 'Server is running on port 8626';

app.get('/', function (req, res){
    console.log('API was successfully requested');
    res.send(runningMessage);
});

app.listen(8626, function() {
    console.log(runningMessage);
});