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
    fs = require('fs'), path = require('path');

http.createServer(function(request, response) {
	var filePath = '.' + request.url;
	if(filePath == './')
		filePath = './index.html';
	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname){
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}
	path.exists(filePath, function(exists) {
		if(exists){
			fs.readFile(filePath, function(error, content){
				if(error){
					response.writeHead(500);
					response.end();
				}
				else{
					response.writeHead(200, { 'Content-Type': 'text/html' });
					response.end(content, 'utf-8');
				}
			});
		}else{
			response.writeHead(404);
			response.end();
		}
	});
})

fs.readFile('./mobile/index.html', function (err, html) {
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
