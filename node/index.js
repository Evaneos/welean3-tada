// SERVING SOCKET TO CLIENT
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log('a user connected');
});



// LISTENING TO PHP CONNECTIONS
var appInternal = require('express')();
var httpInternal = require('http').Server(appInternal);

appInternal.get('/', function(req, res){
    res.send('hello world');
});

httpInternal.listen(3001, '127.0.0.1', function() {
    console.log('listening on 127.0.0.1:3001');
});