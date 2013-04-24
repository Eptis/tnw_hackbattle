var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });

  socket.on('clients', function(data){
    console.log(data);
    
    var receivedSong = data.sendSongId;
    socket.broadcast.emit('tospotify', {songId: receivedSong});
  });

  
});