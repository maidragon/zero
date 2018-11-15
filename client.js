var net = require('net');
var fs = require('fs');

var client = new net.Socket();
client.connect(1337, '127.0.0.1', function() {
  console.log('Connected');
  var file = fs.createReadStream('./test.png');
  file.pipe(client);
  // client.write('Hello, server! Love, Client.');
  
});

client.on('data', function(data) {
	// console.log('Received: ' + data);
	// client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});