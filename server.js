var net = require('net');
var fs = require('fs');
const niceware = require('niceware')
var util = require('./util');

var messageType = util.messageType;
var generateMessage = util.generateMessage;

const passphrase = niceware.generatePassphrase(4).join('-')
const sockets = [];

var server = net.createServer(function(socket) {
  
  socket.on('data', function(data) {
    console.log('length: ', data.length);

    if (data.length < 1024) {
      var message = JSON.parse(data.toString())
      console.log('message: ', message);

      if (message.type === messageType.ASK_FOR_CODE_PHASES) {
        socket.write(generateMessage({ type: messageType.GOT_CODE_PHASES, value: passphrase }));
        sockets.push({ code: passphrase, from: socket });
        console.log(sockets);
      }

      if (message.type === messageType.QUERY_CODE_PHASES) {
        var codePhases = message.value;
        var targetSockets = sockets.filter((socket) => socket.code === codePhases);
        // 找到了文件传输的源头
        if (targetSockets.length > 0) {
          var targetSocket = targetSockets[0].from;
          console.log('targetSocket: ', targetSocket);
          targetSocket.write(generateMessage({ type: messageType.READY_TO_SEND }));
        }
      }

      return;
    }


    var newFileWriteStream = fs.createWriteStream('./newimage.png');

    newFileWriteStream.write(data);

    newFileWriteStream.on('error', function (err) {
      console.log(err);
    });

    // data.pipe(newFileWriteStream);
    // console.log('receiving from client: ', data.toString());
    
    // var isSendFlag = data.toString().trim() === 'send';
    // var isUploadingFlag = data.toString().trim() === 'upload';

    // if (isSendFlag) {
    //   console.log('please send file')
    //   socket.write('start')
    // }

    // if (isUploadingFlag) {
    //   console.log('count: ', count++);
    //   var content = Buffer.from(data);

    //   newFileWriteStream.write(content);

    //   newFileWriteStream.on('error', function (err) {
    //     console.log(err);
    //   });
    //   data.pipe(newFilePath);
    // }
  });

  socket.on('error', function(error) {
    console.log('error: ', error);
  })

	// socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');