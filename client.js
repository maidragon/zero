var net = require('net');
var fs = require('fs');

var client = new net.Socket();

function sendFile(client) {
  var file = fs.createReadStream('./test.png');
  file.pipe(client);
}

client.connect(1337, '127.0.0.1', function() {
  console.log('Connected');
  
});

client.on('data', function(data) {
  if (data.toString() === 'send file') {
    sendFile(client)
  }
  console.log(`receiving from server: ${data}`)
	// console.log('Received: ' + data);
	// client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});

process.stdin.on('data', (data) => {
  client.write(data);
})