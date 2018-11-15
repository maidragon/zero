var net = require('net');
var fs = require('fs');

var count = 0;

var server = net.createServer(function(socket) {
  var newFileWriteStream = fs.createWriteStream('./newimage.png');
  socket.write('Echo server\r\n');
  
  socket.on('data', function(data) {
    console.log('count: ', count++);
    var content = Buffer.from(data);

    newFileWriteStream.write(content);
    // newFileWriteStream.setDefaultEncoding('utf8');

    newFileWriteStream.on('error', function (err) {
      console.log(err);
    });
    // console.log('newFilePath: ', newFilePath);
    // data.pipe(newFilePath);
  });

	socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');