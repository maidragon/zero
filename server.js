var net = require('net');
var fs = require('fs');

var count = 0;

var server = net.createServer(function(socket) {
  // var newFileWriteStream = fs.createWriteStream('./newimage.png');
  socket.write('Echo server\r\n');
  
  socket.on('data', function(data) {
    console.log('receiving from client: ', data.toString());

    if (data.toString() === 'send') {
      socket.write('send file')
      console.log('please send file')
    }

    if (data.toString() === 'send file') {
      console.log('count: ', count++);
      var content = Buffer.from(data);

      newFileWriteStream.write(content);

      newFileWriteStream.on('error', function (err) {
        console.log(err);
      });
      data.pipe(newFilePath);
    }
  });

	// socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');