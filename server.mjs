import express from 'express';
import http from 'http';
import socketServer from 'socket.io';
const app = express();
var httpServer = http.Server(app);
var io = socketServer(http);
const port = process.env.PORT || 4000;
const runningMessage = 'Server is running on port ' + port;

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

app.get('/nestedIfFun', (req, res) => {
  if (req.headers) {
    if (!req.headers.host) {
      if (req.headers.host.endsWith('.com')) {
        console.log(`Here's the host 👉 ${host}`);
      } else {
        console.log('Not an expected host 😲');
      }
    } else {
      console.log('No Host headers 🤯');
      req.headers.forEach(element => {
        if (element) {
          console.log(`Found an element called: ${element}`);
        } else {
          console.log('Say wha?!');
        }
      });
    }
  } else {
    console.log('No headers 🤕');
  }
  res.sendStatus(200);
});

app.get('/test', (req, res) => {
  res.send(runningMessage);
});

app.listen(port, () => {
  console.log(runningMessage);
});
