var net = require('net');
var fs = require('fs');
var util = require('./util');

var messageType = util.messageType;
var generateMessage = util.generateMessage;
var client = new net.Socket();

var codePhases = process.argv[2];

function sendFile() {
  var file = fs.createReadStream('./test.png');
  file.pipe(client);
}

client.connect(1337, '127.0.0.1', function() {
  console.log('Connected');

  if (codePhases && codePhases.length > 0) {
    client.write(generateMessage({ type: messageType.QUERY_CODE_PHASES, value: codePhases }))
  } else {
    client.write(generateMessage({ type: messageType.ASK_FOR_CODE_PHASES}))
  }
});

client.on('data', function(data) {
  var message = JSON.parse(data.toString())
  console.log('message: ', message);

  if (message.type === messageType.GOT_CODE_PHASES) {
    console.log(`已接收到短语 ${message.value} ， 等待连接...`);
  }
  
  if (message.type === messageType.READY_TO_SEND) {
    console.log(`开始传输文件...`);
    var file = fs.createReadStream('./test.png');
    file.pipe(client);
  }
  // var isStartFlag = data.toString().trim() === 'start';
  
  // if (isStartFlag) {
  //   sendFile()
  // }
	// client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});

client.on('error', function(error) {
  console.log('error: ', error);
})

// process.stdin.on('data', (data) => {
//   client.write(data);
// })
