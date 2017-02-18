var express = require('express');
var http = require('http')
var socketio = require('socket.io');

var app = express();
var server = http.Server(app);
var websocket = socketio(server);
server.listen(3000, () => console.log('listening on *:3000'));

websocket.on('connection', (socket) => {

  console.log('Connected ('+ socket.id +')');

  socket.emit('connected', 'Connected.');

  socket.on('input', (input) => {

    console.log('Input: '+input.x+'/'+input.y);

    socket.emit('output', (input.x+input.y).toFixed(0));
  })
});
