var io = require('socket.io').listen(8080);
console.log("socket io running on port 8080");

io.sockets.on('connection', function (socket) {
  socket.on('clients', function(data){
    console.log(data);
    
    var receivedSong = data.sendSongId;
    socket.broadcast.emit('tospotify', {songId: receivedSong});
  });
});


var http = require('http'),
    fs = require('fs');


fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(8000);
    console.log("http server running on port 8000");
});