var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('receive_clients', function(data){
    console.log(data);
    socket.emit('send_spotify', {songId: 'song id send from client'});
  });
});